import { ConflictException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { User } from './entities/user.entity.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

const makeMockUserDoc = (overrides: Partial<Record<string, unknown>> = {}) => ({
  id: 'mock-object-id',
  name: 'João Silva',
  email: 'joao@email.com',
  password: 'hashed',
  ...overrides,
});

const buildMockModel = () => {
  const store: ReturnType<typeof makeMockUserDoc>[] = [];

  return {
    findOne: vi.fn(({ email }: { email: string }) => {
      return Promise.resolve(store.find((u) => u.email === email) ?? null);
    }),
    findById: vi.fn((id: string) => {
      return Promise.resolve(store.find((u) => u.id === id) ?? null);
    }),
    create: vi.fn(
      (dto: { name: string; email: string; password: string }) => {
        const doc = makeMockUserDoc({ id: 'mock-object-id', ...dto });
        store.push(doc);
        return Promise.resolve(doc);
      },
    ),
    _store: store,
  };
};

describe('UsersController', () => {
  let usersController: UsersController;
  let mockUserModel: ReturnType<typeof buildMockModel>;

  beforeEach(async () => {
    mockUserModel = buildMockModel();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    usersController = module.get(UsersController);
  });

  describe('create', () => {
    it('should register a user and return data without password', async () => {
      const result = await usersController.create({
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'Senha@123',
      });

      expect(result).toEqual({
        id: expect.any(String),
        name: 'João Silva',
        email: 'joao@email.com',
      });
      expect(result).not.toHaveProperty('password');
    });

    it('should throw ConflictException when email is already registered', async () => {
      const dto = {
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'Senha@123',
      };

      // Seed the mock store with an existing user so findOne returns it
      mockUserModel.findOne.mockResolvedValueOnce(makeMockUserDoc());

      await expect(usersController.create(dto)).rejects.toBeInstanceOf(
        ConflictException,
      );
    });
  });
});

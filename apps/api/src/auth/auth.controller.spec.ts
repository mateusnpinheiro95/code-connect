import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { User } from '../users/entities/user.entity.js';
import { UsersService } from '../users/users.service.js';
import { AuthController } from './auth.controller.js';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import { jwtConstants } from './constants.js';

const buildMockModel = () => {
  type DocShape = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  const store: DocShape[] = [];
  let counter = 0;

  return {
    findOne: vi.fn(({ email }: { email: string }) => {
      return Promise.resolve(store.find((u) => u.email === email) ?? null);
    }),
    findById: vi.fn((id: string) => {
      return Promise.resolve(store.find((u) => u.id === id) ?? null);
    }),
    create: vi.fn((dto: { name: string; email: string; password: string }) => {
      const doc: DocShape = { id: `mock-id-${++counter}`, ...dto };
      store.push(doc);
      return Promise.resolve(doc);
    }),
    _store: store,
  };
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUserModel = buildMockModel();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        AuthGuard,
        UsersService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
      ],
    }).compile();

    authController = module.get(AuthController);
    authService = module.get(AuthService);
    usersService = module.get(UsersService);

    await usersService.create({
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'Senha@123',
    });
  });

  describe('signIn', () => {
    it('should return an access token for valid credentials', async () => {
      const result = await authController.signIn({
        email: 'joao@email.com',
        password: 'Senha@123',
      });

      expect(result).toEqual({
        access_token: expect.any(String),
      });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      await expect(
        authController.signIn({
          email: 'joao@email.com',
          password: 'wrong-password',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('should return the authenticated user profile', async () => {
      const { access_token } = await authService.signIn(
        'joao@email.com',
        'Senha@123',
      );

      const user = await usersService.findByEmail('joao@email.com');

      const profile = await authController.getProfile({
        user: { sub: user!.id as string, email: user!.email },
      });

      expect(profile).toEqual({
        id: user!.id,
        name: 'João Silva',
        email: 'joao@email.com',
      });
      expect(access_token).toEqual(expect.any(String));
    });

    it('should reject when AuthGuard has no bearer token', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [
          JwtModule.register({
            secret: jwtConstants.secret,
          }),
        ],
        providers: [AuthGuard],
      }).compile();

      const guard = moduleRef.get(AuthGuard);

      await expect(
        guard.canActivate({
          switchToHttp: () => ({
            getRequest: () => ({ headers: {} }),
          }),
        } as never),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});

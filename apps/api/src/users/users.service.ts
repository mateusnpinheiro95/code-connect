import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import type { UserResponseDto } from '../common/dto/user-response.dto.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { User, type UserDocument } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const emailExists = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (emailExists) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const user = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });

    return this.toResponse(user);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  toResponse(user: UserDocument): UserResponseDto {
    return {
      id: user.id as string,
      name: user.name,
      email: user.email,
    };
  }
}

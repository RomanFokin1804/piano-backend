import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getById(id: string): Promise<User | null> {
    return this.userRepository.getById({ id: Number(id) });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepository.getBy({ email });
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.userRepository.getBy({ username });
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll({});
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.userRepository.create(data);
  }

  async update(id: string, body: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.update({ where: { id: +id }, data: body });
  }

  async delete(id: string): Promise<User> {
    return this.userRepository.delete({ id: +id });
  }
}

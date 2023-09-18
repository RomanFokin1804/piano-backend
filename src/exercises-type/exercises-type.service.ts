import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { ExercisesTypeRepository } from './repositories/exercises-type.repository';

@Injectable()
export class ExercisesTypeService {
  constructor(private exercisesTypeRepository: ExercisesTypeRepository) {}

  async getById(id: string): Promise<User | null> {
    return this.exercisesTypeRepository.getById({ id: Number(id) });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.exercisesTypeRepository.getBy({ email });
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.exercisesTypeRepository.getBy({ username });
  }

  async getAll(): Promise<User[]> {
    return this.exercisesTypeRepository.getAll({});
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.exercisesTypeRepository.create(data);
  }

  async update(id: string, body: Prisma.UserUpdateInput): Promise<User> {
    return this.exercisesTypeRepository.update({
      where: { id: +id },
      data: body,
    });
  }

  async delete(id: string): Promise<User> {
    return this.exercisesTypeRepository.delete({ id: +id });
  }
}

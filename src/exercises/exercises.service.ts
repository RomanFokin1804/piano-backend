import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { ExercisesRepository } from './repositories/exercises.repository';

@Injectable()
export class ExercisesService {
  constructor(private exercisesRepository: ExercisesRepository) {}

  async getById(id: string): Promise<User | null> {
    return this.exercisesRepository.getById({ id: Number(id) });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.exercisesRepository.getBy({ email });
  }

  async getByUsername(username: string): Promise<User | null> {
    return this.exercisesRepository.getBy({ username });
  }

  async getAll(): Promise<User[]> {
    return this.exercisesRepository.getAll({});
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.exercisesRepository.create(data);
  }

  async update(id: string, body: Prisma.UserUpdateInput): Promise<User> {
    return this.exercisesRepository.update({
      where: { id: +id },
      data: body,
    });
  }

  async delete(id: string): Promise<User> {
    return this.exercisesRepository.delete({ id: +id });
  }
}

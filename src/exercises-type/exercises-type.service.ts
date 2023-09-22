import { Injectable } from '@nestjs/common';
import { Prisma, ExercisesType } from '@prisma/client';
import { ExercisesTypeRepository } from './repositories/exercises-type.repository';

@Injectable()
export class ExercisesTypeService {
  constructor(private exercisesTypeRepository: ExercisesTypeRepository) {}

  async getById(id: number): Promise<ExercisesType | null> {
    return this.exercisesTypeRepository.getById({ id });
  }

  async getAll(): Promise<ExercisesType[]> {
    return this.exercisesTypeRepository.getAll({});
  }

  async create(data: Prisma.ExercisesTypeCreateInput): Promise<ExercisesType> {
    return this.exercisesTypeRepository.create(data);
  }

  async update(
    id: number,
    body: Prisma.ExerciseUpdateInput,
  ): Promise<ExercisesType> {
    return this.exercisesTypeRepository.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: number): Promise<ExercisesType> {
    return this.exercisesTypeRepository.delete({ id });
  }
}

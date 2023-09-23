import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Exercise, Prisma } from '@prisma/client';

@Injectable()
export class ExercisesRepository {
  constructor(private prisma: PrismaService) {}

  async getById(
    exerciseWhereUniqueInput: Prisma.ExerciseWhereUniqueInput,
  ): Promise<Exercise | null> {
    return this.prisma.exercise.findUnique({
      where: exerciseWhereUniqueInput,
    });
  }

  async getAllBy(
    exerciceWhereInput: Prisma.ExerciseWhereInput,
  ): Promise<Exercise[]> {
    return this.prisma.exercise.findMany({
      where: exerciceWhereInput,
    });
  }

  async getAll({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ExerciseWhereUniqueInput;
    where?: Prisma.ExerciseWhereInput;
    orderBy?: Prisma.ExerciseOrderByWithRelationInput;
  }): Promise<Exercise[]> {
    return this.prisma.exercise.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ExerciseCreateInput): Promise<Exercise> {
    return this.prisma.exercise.create({
      data,
      include: {
        notes: {
          select: {
            id: true,
            note: true,
          },
        },
      },
    });
  }

  async update({
    where,
    data,
  }: {
    where: Prisma.ExerciseWhereUniqueInput;
    data: Prisma.ExerciseUpdateInput;
  }): Promise<Exercise> {
    return this.prisma.exercise.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ExerciseWhereUniqueInput): Promise<Exercise> {
    return this.prisma.exercise.delete({
      where,
    });
  }
}

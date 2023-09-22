import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ExercisesType } from '@prisma/client';

@Injectable()
export class ExercisesTypeRepository {
  constructor(private prisma: PrismaService) {}

  async getById(
    exercisesTypeWhereUniqueInput: Prisma.ExercisesTypeWhereUniqueInput,
  ): Promise<ExercisesType | null> {
    return this.prisma.exercisesType.findUnique({
      where: exercisesTypeWhereUniqueInput,
    });
  }

  async getBy(
    exercisesTypeWhereInput: Prisma.ExercisesTypeWhereInput,
  ): Promise<ExercisesType | null> {
    return this.prisma.exercisesType.findFirst({
      where: exercisesTypeWhereInput,
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
    cursor?: Prisma.ExercisesTypeWhereUniqueInput;
    where?: Prisma.ExercisesTypeWhereInput;
    orderBy?: Prisma.ExercisesTypeOrderByWithRelationInput;
  }): Promise<ExercisesType[]> {
    return this.prisma.exercisesType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ExercisesTypeCreateInput): Promise<ExercisesType> {
    return this.prisma.exercisesType.create({
      data,
    });
  }

  async update({
    where,
    data,
  }: {
    where: Prisma.ExercisesTypeWhereUniqueInput;
    data: Prisma.ExercisesTypeUpdateInput;
  }): Promise<ExercisesType> {
    return this.prisma.exercisesType.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.ExercisesTypeWhereUniqueInput,
  ): Promise<ExercisesType> {
    return this.prisma.exercisesType.delete({
      where,
    });
  }
}

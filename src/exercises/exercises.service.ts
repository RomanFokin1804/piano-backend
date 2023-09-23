import { Injectable } from '@nestjs/common';
import { Prisma, Exercise } from '@prisma/client';
import { ExercisesRepository } from './repositories/exercises.repository';
import { CreateExerciseDto, IRandomNote } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private exercisesRepository: ExercisesRepository) {}

  async getById(id: number): Promise<Exercise | null> {
    return this.exercisesRepository.getById({ id });
  }

  async getAll(): Promise<Exercise[]> {
    return this.exercisesRepository.getAll({});
  }

  async getByUserOrType(userId?: number, typeId?: number): Promise<Exercise[]> {
    return this.exercisesRepository.getAllBy({ userId, typeId });
  }

  async create(data: CreateExerciseDto): Promise<Exercise> {
    return await this.exercisesRepository.create({
      notes: {
        create: generateRandomNotes(15, data.difficulty),
      },
      user: {
        connect: {
          id: data.userId,
        },
      },
      type: {
        connect: {
          id: data.typeId,
        },
      },
    });
  }

  async update(
    id: number,
    body: Prisma.ExerciseUpdateInput,
  ): Promise<Exercise> {
    return this.exercisesRepository.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: number): Promise<Exercise> {
    return this.exercisesRepository.delete({ id });
  }
}

function generateRandomNotes(
  length: number,
  maxDifference: number,
): IRandomNote[] {
  const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];
  const result: IRandomNote[] = [];

  result.push({
    note: notes[Math.floor(Math.random() * notes.length)],
  });

  for (let i = 1; i < length; i++) {
    const currentIndex = notes.indexOf(result[i - 1].note);
    const minIndex = Math.max(0, currentIndex - maxDifference);
    const maxIndex = Math.min(notes.length - 1, currentIndex + maxDifference);
    const nextIndex =
      Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    result.push({ note: notes[nextIndex] });
  }

  return result;
}

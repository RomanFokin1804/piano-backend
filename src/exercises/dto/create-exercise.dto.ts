import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum difficultyEnum {
  VERY_EASY = 1,
  SIMPLE = 2,
  BEGINNER = 3,
  EASY = 4,
  INTERMEDIATE = 5,
  MODERATE = 6,
  CHALLENGING = 7,
  DIFFICULT = 8,
  COMPLEX = 9,
  EXPERT = 10,
}

export class CreateExerciseDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  typeId: number;

  @IsEnum(difficultyEnum)
  @IsNotEmpty()
  difficulty: difficultyEnum;
}

export interface IRandomNote {
  note: string;
}

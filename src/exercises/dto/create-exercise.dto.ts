import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExerciseDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  typeId: number;
}

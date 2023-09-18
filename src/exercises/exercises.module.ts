import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ExercisesService } from './exercises.service';
import { ExercisesRepository } from './repositories/exercises.repository';
import { ExercisesController } from './exercises.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, PrismaService, ExercisesRepository],
  exports: [ExercisesService],
})
export class ExercisesModule {}

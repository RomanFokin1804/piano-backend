import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ExercisesTypeController } from './exercises-type.controller';
import { ExercisesTypeService } from './exercises-type.service';
import { ExercisesTypeRepository } from './repositories/exercises-type.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ExercisesTypeController],
  providers: [ExercisesTypeService, PrismaService, ExercisesTypeRepository],
  exports: [ExercisesTypeService],
})
export class UserModule {}

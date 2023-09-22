import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { Prisma } from '@prisma/client';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { JwtAdminAuthGuard } from '../auth/guards/jwt-admin-auth.guard';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(JwtAccessAuthGuard)
  async create(@Body() body: CreateExerciseDto) {
    return await this.exercisesService.create(body);
  }

  @Get('/by-id/:id')
  @UseGuards(JwtAccessAuthGuard)
  async getById(@Param('id') id: string) {
    return await this.exercisesService.getById(+id);
  }

  @Get()
  @UseGuards(JwtAdminAuthGuard)
  async getAll() {
    return await this.exercisesService.getAll();
  }

  @Get('get-by-user-or-type')
  @UseGuards(JwtAccessAuthGuard)
  async getByUserOrType(
    @Query('userId') userId: string,
    @Query('typeId') typeId: string,
  ) {
    return await this.exercisesService.getByUserOrType(
      +userId ? +userId : undefined,
      +typeId ? +typeId : undefined,
    );
  }

  @Patch('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return await this.exercisesService.update(+id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAdminAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.exercisesService.delete(+id);
  }
}

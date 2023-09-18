import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { Prisma } from '@prisma/client';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async getById(@Param('id') id: string) {
    return await this.exercisesService.getById(id);
  }

  @Get()
  @UseGuards(JwtAccessAuthGuard)
  async getAll() {
    return await this.exercisesService.getAll();
  }

  @Patch('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return await this.exercisesService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.exercisesService.delete(id);
  }
}

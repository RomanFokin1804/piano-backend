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
import { ExercisesTypeService } from './exercises-type.service';

@Controller('exercises-type')
export class ExercisesTypeController {
  constructor(private exercisesTypeService: ExercisesTypeService) {}

  @Get('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async getById(@Param('id') id: string) {
    return await this.exercisesTypeService.getById(id);
  }

  @Get()
  @UseGuards(JwtAccessAuthGuard)
  async getAll() {
    return await this.exercisesTypeService.getAll();
  }

  @Patch('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return await this.exercisesTypeService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.exercisesTypeService.delete(id);
  }
}

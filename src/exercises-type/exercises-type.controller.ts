import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { Prisma } from '@prisma/client';
import { ExercisesTypeService } from './exercises-type.service';
import { JwtAdminAuthGuard } from '../auth/guards/jwt-admin-auth.guard';

@Controller('exercises-type')
export class ExercisesTypeController {
  constructor(private exercisesTypeService: ExercisesTypeService) {}

  @Post()
  @UseGuards(JwtAdminAuthGuard)
  async create(@Body() body: Prisma.ExercisesTypeCreateInput) {
    return await this.exercisesTypeService.create(body);
  }

  @Get('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async getById(@Param('id') id: string) {
    return await this.exercisesTypeService.getById(+id);
  }

  @Get()
  @UseGuards(JwtAccessAuthGuard)
  async getAll() {
    return await this.exercisesTypeService.getAll();
  }

  @Patch('/:id')
  @UseGuards(JwtAdminAuthGuard)
  async update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return await this.exercisesTypeService.update(+id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAdminAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.exercisesTypeService.delete(+id);
  }
}

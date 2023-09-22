import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { Prisma } from '@prisma/client';
import { JwtAdminAuthGuard } from '../auth/guards/jwt-admin-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async getById(
    @Param('id') id: string,
    @Query('include-exercises') includeExercises: string,
  ) {
    return await this.userService.getById(+id, Boolean(includeExercises));
  }

  @Get()
  @UseGuards(JwtAdminAuthGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Patch('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return await this.userService.update(+id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAccessAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(+id);
  }
}

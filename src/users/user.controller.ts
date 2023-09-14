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
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: string) {
    return await this.userService.getById({ id: Number(id) });
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return true;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() id: string) {
    return true;
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update() {
    return true;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete() {
    return true;
  }
}

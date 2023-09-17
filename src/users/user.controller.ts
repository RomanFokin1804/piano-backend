import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.userService.getAll();
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}

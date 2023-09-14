import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  /*imports: [
    TypeOrmModule.forFeature([]),
  ],*/
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configOauth from './config/config.oauth';
import configJwtAccess from './config/config.jwt-access';
import configJwtRefresh from './config/config.jwt-refresh';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configOauth, configJwtAccess, configJwtRefresh],
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

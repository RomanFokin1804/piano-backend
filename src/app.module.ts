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
import { ExercisesModule } from './exercises/exercises.module';
import { ExercisesTypeModule } from './exercises-type/exercises-type.module';
import configJwtAdmin from './config/config.jwt-admin';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ExercisesModule,
    ExercisesTypeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configOauth, configJwtAccess, configJwtRefresh, configJwtAdmin],
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

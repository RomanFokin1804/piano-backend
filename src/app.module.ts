import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configOauth from './config/config.oauth';
import configJwt from './config/config.jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configOauth, configJwt],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

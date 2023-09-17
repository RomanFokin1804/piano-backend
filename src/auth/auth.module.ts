import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { IJWTConfig } from '../config/config.jwt';
import { CONFIG_JWT } from '../config/config.constant';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: undefined,
      useFactory: (configService: ConfigService) => {
        const { secret, signOptions } =
          configService.get<IJWTConfig>(CONFIG_JWT);
        return {
          secret,
          signOptions,
          global: true,
        };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

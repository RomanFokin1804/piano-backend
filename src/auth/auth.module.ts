import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { IJWTConfig } from '../config/config.jwt';
import { CONFIG_JWT } from '../config/config.constant';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: undefined,
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<IJWTConfig>(CONFIG_JWT));
        const { secret } = configService.get<IJWTConfig>(CONFIG_JWT);
        return {
          secret,
        };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}

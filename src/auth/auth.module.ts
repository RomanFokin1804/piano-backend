import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { UserModule } from '../users/user.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [JwtModule.register({}), PassportModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

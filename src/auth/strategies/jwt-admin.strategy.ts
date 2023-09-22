import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CONFIG_JWT_ADMIN } from '../../config/config.constant';
import { ConfigService } from '@nestjs/config';
import { IJWTConfig } from '../../config/config.jwt-access';
import { UserService } from '../../users/user.service';
import configJwtAdmin, { IJWTAdminConfig } from '../../config/config.jwt-admin';

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<IJWTConfig>(CONFIG_JWT_ADMIN).secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getById(+payload.sub);
    if (!user) throw new UnauthorizedException('Please log in to continue');

    const adminEmails =
      this.configService.get<IJWTAdminConfig>(CONFIG_JWT_ADMIN).emails;

    if (!adminEmails.includes(payload.email))
      throw new ForbiddenException('Forbidden!');

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}

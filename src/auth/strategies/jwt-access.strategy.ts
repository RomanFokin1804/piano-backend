import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CONFIG_JWT_ACCESS } from '../../config/config.constant';
import { ConfigService } from '@nestjs/config';
import { IJWTConfig } from '../../config/config.jwt-access';
import { UserService } from '../../users/user.service';

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
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
      secretOrKey: configService.get<IJWTConfig>(CONFIG_JWT_ACCESS).secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getById(payload.sub);
    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}

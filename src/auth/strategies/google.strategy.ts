import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { IOAuthConfig } from '../../config/config.oauth';
import { CONFIG_OAUTH } from '../../config/config.constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<IOAuthConfig>(CONFIG_OAUTH).clientID,
      clientSecret: configService.get<IOAuthConfig>(CONFIG_OAUTH).clientSecret,
      callbackURL: configService.get<IOAuthConfig>(CONFIG_OAUTH).callbackURL,
      scope: configService.get<IOAuthConfig>(CONFIG_OAUTH).scope,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      photo: photos[0].value,
    };

    done(null, user);
  }
}

import { registerAs } from '@nestjs/config';
import { CONFIG_OAUTH } from './config.constant';

export interface IOAuthConfig {
  readonly clientID: string;
  readonly clientSecret: string;
  readonly callbackURL: string;
  readonly scope: string[];
}

export default registerAs(
  CONFIG_OAUTH,
  (): IOAuthConfig => ({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK_URL,
    scope: ['profile', 'email'],
  }),
);

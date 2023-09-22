import { registerAs } from '@nestjs/config';
import { CONFIG_JWT_ADMIN } from './config.constant';
import * as process from 'process';

export interface IJWTAdminConfig {
  readonly secret: string;
  readonly signOptions: {
    expiresIn: string;
  };
  readonly emails: string[];
}

export default registerAs(
  CONFIG_JWT_ADMIN,
  (): IJWTAdminConfig => ({
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    },
    emails: JSON.parse(process.env.ADMIN_EMAILS),
  }),
);

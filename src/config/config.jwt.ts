import { registerAs } from '@nestjs/config';
import { CONFIG_JWT } from './config.constant';
import * as process from 'process';

export interface IJWTConfig {
  readonly secret: string;
  readonly signOptions: {
    expiresIn: string;
  };
}

export default registerAs(
  CONFIG_JWT,
  (): IJWTConfig => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  }),
);

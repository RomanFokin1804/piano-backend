import { registerAs } from '@nestjs/config';
import { CONFIG_JWT } from './config.constant';

export interface IJWTConfig {
  readonly secret: string;
}

export default registerAs(
  CONFIG_JWT,
  (): IJWTConfig => ({
    secret: process.env.JWT_SECRET,
  }),
);

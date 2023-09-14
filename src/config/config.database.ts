// import { registerAs } from '@nestjs/config';
// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
// import { CONFIG_DATABASE } from './config.constant';
//
// export type DatabaseConnectionOptions = MysqlConnectionOptions;
//
// export default registerAs<DatabaseConnectionOptions>(
//   CONFIG_DATABASE,
//   () =>
//     ({
//       type: 'mysql',
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//     } as const),
// );

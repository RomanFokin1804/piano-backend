import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configDatabase, {
  DatabaseConnectionOptions,
} from './config/config.database';
import { CONFIG_DATABASE } from './config/config.constant';
import { EntitySubscriber } from './subscribers/entity.subscriber';
import configOauth from './config/config.oauth';
import configJwt from './config/config.jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configDatabase, configOauth, configJwt],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<DatabaseConnectionOptions>(CONFIG_DATABASE),
        subscribers: [EntitySubscriber],
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

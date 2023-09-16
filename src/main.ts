import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { AllExceptionsFilter } from './middleware/exception.interceptor';

async function bootstrap() {
  BigInt.prototype['toJSON'] = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  const PORT = +process.env.PORT || 3000;

  await app.listen(PORT, () => console.log(`Start on PORT: ${PORT}`));
}
bootstrap();

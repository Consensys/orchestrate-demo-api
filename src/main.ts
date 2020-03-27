import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { environment } from 'src/config/environments/environment';
import { SwaggerConfigService } from 'src/config/services/swagger-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  SwaggerConfigService.setup(app);
  await app.listen(environment.port, '0.0.0.0');
}
bootstrap();

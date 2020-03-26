import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environment } from 'src/config/environments/environment';
import { INestApplication } from '@nestjs/common';
import { route } from 'src/app.routing';

export class SwaggerConfigService {
    static setup(app: INestApplication) {
        const options = new DocumentBuilder()
            .setTitle('PegaSys Orchestrate Manager API')
            .addTag(route.helloWorld)
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(environment.basePath, app, document);
    }
}

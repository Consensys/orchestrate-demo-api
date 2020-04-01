import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environment } from 'src/config/environments/environment';
import { INestApplication } from '@nestjs/common';
import { route } from 'src/app.routing';

export class SwaggerConfigService {
    static setup(app: INestApplication): void {
        const options = new DocumentBuilder()
            .setTitle('PegaSys Orchestrate Manager API')
            .addTag(route.accounts)
            .addTag(route.contracts)
            .addTag(route.consumer)
            .addTag(route.faucets)
            .addTag(route.networks)
            .addTag(route.transactions)
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('swagger', app, document);
    }
}

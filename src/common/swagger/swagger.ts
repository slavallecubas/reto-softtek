import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  private config: any;
  private document: OpenAPIObject;

  constructor(app: INestApplication) {
    this.configSwagger(app);
    this.initSwagger(app);
  }

  configSwagger(app: INestApplication): void {
    this.config = new DocumentBuilder();
    this.config
      .setTitle('API SOFTTEK/RIMAC')
      .setDescription('RETO TECNICO PARA CLIENTE RIMAC SEGUROS')
      .setVersion('1.0')
      .build();
    this.document = SwaggerModule.createDocument(app, this.config);
  }

  initSwagger(app: INestApplication): void {
    SwaggerModule.setup('/docs', app, this.document);
  }
}

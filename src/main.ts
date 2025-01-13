import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Starting application...');
  const app = await NestFactory.create(AppModule);
  console.log('Configuring RabbitMQ connection...');
  app.enableCors({
    origin: 'http://localhost:55093', // Your Angular app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Connect to RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'news_queue',
      queueOptions: {
        durable: false,
      },
      noAck: false,
    },
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('News API')
    .setDescription('The News API description')
    .setVersion('1.0')
    .addTag('news')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start microservice
  await app.startAllMicroservices();

  // Start HTTP server
  await app.listen(3000);
}
bootstrap();

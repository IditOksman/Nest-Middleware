import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyPythonService } from './services/mypython.service';
import { HttpModule } from '@nestjs/axios';
import { MyPythonController } from './controllers/mypython.controller';
import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'NEWS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'news_queue',
          queueOptions: {
            durable: false,
          },
          noAck: false,
        },
      },
    ]),
  ],
  controllers: [AppController, MyPythonController, NewsController],
  providers: [AppService, MyPythonService, NewsService],
})
export class AppModule {}

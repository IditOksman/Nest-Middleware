import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyPythonService } from './services/mypython.service';
import { HttpModule } from '@nestjs/axios';
import { MyPythonController } from './controllers/mypython.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, MyPythonController],
  providers: [AppService, MyPythonService],
})
export class AppModule {}

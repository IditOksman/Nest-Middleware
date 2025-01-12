import { Controller, Get } from '@nestjs/common';
import { MyPythonService } from 'src/services/mypython.service';

@Controller('api')
export class MyPythonController {
  constructor(private readonly myPythonService: MyPythonService) {}

  @Get('python-data')
  async getDataFromService() {
    try {
      const data = await this.myPythonService.getData();
      return { data: data };
    } catch (error) {
      console.error('Controller Error:', error);
      throw error;
    }
  }
}

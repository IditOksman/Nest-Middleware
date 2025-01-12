import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MyPythonService {
  constructor(private readonly httpService: HttpService) {}
  async getData() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:8000/'),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

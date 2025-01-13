import { Controller, Get } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NewsDto } from 'src/news/dto/news.dto';
import { NewsService } from 'src/services/news.service';

@ApiTags('news')
@Controller('api')
export class NewsController {
  constructor(private readonly newsService: NewsService) {
    console.log('NewsController initialized'); // Add this line
  }

  @Get('/news')
  @ApiResponse({ status: 200, type: [NewsDto] })
  getAllNews(): NewsDto[] {
    return this.newsService.getAllNews();
  }

  @EventPattern('news_queue') // Changed from 'news.all' to match the queue name
  async handleNewsEvent(@Payload() data: NewsDto, @Ctx() context: RmqContext) {
    console.log('Received message:', data); // Debug log
    console.log('Event pattern triggered');
    console.log('Raw message data:', data);
    console.log('Context:', context);

    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      console.log('Parsed data:', parsedData);
      await this.newsService.addNews(parsedData);
      // Acknowledge the message
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
      console.log('Message processed and acknowledged');
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }
}

// news.service.ts
import { Injectable } from '@nestjs/common';
import { NewsDto } from 'src/news/dto/news.dto';

@Injectable()
export class NewsService {
  private news: NewsDto[] = [
    {
      title: 'Sample News',
      content: 'This is sample content',
      category: 'Technology',
      timestamp: new Date().toISOString(),
      keywords: ['tech', 'sample'],
    },
  ];

  getAllNews(): NewsDto[] {
    return this.news;
  }

  addNews(newsItem: NewsDto) {
    console.log('Adding news item:', newsItem);
    this.news.push(newsItem);
    // Keep only last 20 items
    if (this.news.length > 20) {
      this.news = this.news.slice(-20);
    }
  }
}

import { IsString, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsDateString()
  timestamp: string;

  @ApiProperty()
  @IsArray()
  keywords: string[];
}

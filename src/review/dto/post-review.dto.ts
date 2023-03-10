import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from 'src/catalogue/types';

export class PostReviewDto {
  @IsNotEmpty()
  @IsEnum(Category)
  @ApiProperty()
  device: Category;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  message: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  pros: string[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  cons: string[];
}

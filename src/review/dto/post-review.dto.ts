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
  device: Category;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsArray()
  pros: string[];

  @IsNotEmpty()
  @IsArray()
  cons: string[];
}

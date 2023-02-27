import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from '../types';

export class CreateCatalogueItemDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category)
  category: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  mainPhoto: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNumber()
  discountedPrice: number;

  @IsNotEmpty()
  @IsBoolean()
  bestSeller: boolean;

  @IsArray()
  shortSpecs: string[][];
}

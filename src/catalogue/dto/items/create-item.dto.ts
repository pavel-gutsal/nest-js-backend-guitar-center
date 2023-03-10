import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Category } from '../../types';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Category)
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mainPhoto: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  discountedPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  bestSeller: boolean;

  @ApiProperty()
  @IsArray()
  shortSpecs: string[][];
}

export class CatalogItem extends CreateItemDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  model: string;
}

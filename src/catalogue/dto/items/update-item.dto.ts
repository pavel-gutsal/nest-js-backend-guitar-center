import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../../types';

export class UpdateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category)
  @IsOptional()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  mainPhoto: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  discountedPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  bestSeller: boolean;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  shortSpecs: string[][];
}

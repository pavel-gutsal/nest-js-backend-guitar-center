import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CatalogItem } from '../dto/items/create-item.dto';
import { SpecsFromServer } from '../dto/specifications/create-specification.dto';

export enum Category {
  PHONES = 'phones',
  TABLETS = 'tablets',
  LAPTOPS = 'laptops',
}

export enum CategoryUpercase {
  phone = 'Phone',
  tablet = 'Tablet',
  laptop = 'Laptop',
}

export enum SortBy {
  RATING = 'rating',
  DISCOUNTEDPRICE = 'discountedPrice',
  POPULARITY = 'bestSeller',
  NEWEST = 'createdAt',
}

export interface Specification {
  [key: string]: {
    [key: string]: string;
  };
}

export class SpecsBrief {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  diagonal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  memory?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  os?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  processor: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  ram?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  gpu?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  screen?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  screenType?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  battery?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  core?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  camera?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  selfie?: string;
}

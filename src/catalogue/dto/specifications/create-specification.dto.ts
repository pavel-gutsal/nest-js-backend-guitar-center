import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  CategoryUpercase,
  Specification,
  SpecsBrief,
} from 'src/catalogue/types';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class CreateSpecsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CategoryUpercase)
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  comments: number;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => SpecsBrief)
  specsBriefIcon: SpecsBrief;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  photos: string[];

  @ApiProperty()
  @IsObject()
  specifications: Specification;
}

export class SpecsFromServer extends CreateSpecsDto {
  @ApiProperty()
  _id: ObjectId;
}

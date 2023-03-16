import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Cart {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  number: number;
}

export class ShoppingCartListDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Cart)
  list: Cart[];
}

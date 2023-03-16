import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Product {
  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  number: number;
}

export class CartCheckoutDto {
  @IsArray()
  @ValidateNested()
  @Type(() => Product)
  list: Product[];
}

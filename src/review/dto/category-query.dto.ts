import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { Category } from 'src/catalogue/types';

const isNumber = new RegExp(/[0-9]{1,}/);

export class CategoryQueryDto {
  @IsNotEmpty()
  @IsEnum(Category)
  device: Category;

  @IsNotEmpty()
  @Matches(isNumber, { message: `limit must be a string` })
  limit: string;
}

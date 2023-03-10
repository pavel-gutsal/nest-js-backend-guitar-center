import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { Category } from 'src/catalogue/types';

const isNumber = new RegExp(/[0-9]{1,}/);

export class CategoryQueryDto {
  @IsNotEmpty()
  @IsEnum(Category)
  @ApiProperty({
    description: 'specifies selection filter',
    enum: ['phones', 'tablets', 'laptops'],
  })
  device: Category;

  @IsNotEmpty()
  @Matches(isNumber, { message: `limit must be a string` })
  @ApiProperty({
    description: 'number of reviews to be send to client',
    type: String,
  })
  limit: string;
}

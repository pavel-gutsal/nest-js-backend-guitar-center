import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Category } from 'src/catalogue/types';

export class TDate {
  @ApiProperty()
  formatted: string;

  @ApiProperty()
  normalised: number;
}

export class ReviewNormalised {
  @ApiProperty()
  id: string;

  @ApiProperty()
  device: Category;

  @ApiProperty()
  author: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  date: TDate;

  @ApiProperty()
  pros: string[];

  @ApiProperty()
  cons: string[];
}

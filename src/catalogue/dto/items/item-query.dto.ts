import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SortBy } from '../../types';

export class ItemQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  limit?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  sortBy?: SortBy;
}

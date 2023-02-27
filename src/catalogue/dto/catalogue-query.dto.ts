import { IsNotEmpty, IsOptional } from 'class-validator';
import { SortBy } from '../types';

export class CatalogueQueryDto {
  @IsNotEmpty()
  @IsOptional()
  limit?: number;

  @IsNotEmpty()
  @IsOptional()
  page?: number;

  @IsNotEmpty()
  @IsOptional()
  sortBy?: SortBy;
}

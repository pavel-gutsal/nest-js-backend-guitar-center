import { ApiProperty } from '@nestjs/swagger';
import { CatalogItem } from '../dto/items/create-item.dto';
import { SpecsFromServer } from '../dto/specifications/create-specification.dto';

export class Product {
  @ApiProperty()
  item: CatalogItem | null;

  @ApiProperty()
  details: SpecsFromServer | null;

  @ApiProperty()
  error: string | null;
}

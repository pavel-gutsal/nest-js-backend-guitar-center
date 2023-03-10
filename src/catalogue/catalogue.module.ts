import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, CatalogueSchema } from './schemas/catalogue.schema';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from './catalogue.service';
import {
  Specifications,
  SpecificationsSchema,
} from './schemas/Specifications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: CatalogueSchema },
      { name: Specifications.name, schema: SpecificationsSchema },
    ]),
  ],
  controllers: [CatalogueController],
  providers: [CatalogueService],
})
export class CatalogueModule {}

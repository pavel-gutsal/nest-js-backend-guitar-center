import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalogue, CatalogueSchema } from './schemas/catalogue.schema';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from './catalogue.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Catalogue.name, schema: CatalogueSchema },
    ]),
  ],
  controllers: [CatalogueController],
  providers: [CatalogueService],
})
export class CatalogueModule {}

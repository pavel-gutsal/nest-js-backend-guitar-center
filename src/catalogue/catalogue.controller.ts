import { Controller, Get, Param, Post } from '@nestjs/common';
import { Body, Query } from '@nestjs/common/decorators';
import { CatalogueService } from './catalogue.service';
import { CreateCatalogueItemDto } from './dto/create-catalogueItem.dto';
import { CatalogueQueryDto } from './dto/catalogue-query.dto';
import { Category } from './types';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get(':category')
  async getCatalogue(
    @Param('category') category: Category,
    @Query() catalogueQueryDto: CatalogueQueryDto,
  ) {
    return this.catalogueService.getAll(category, catalogueQueryDto);
  }

  @Post()
  async postCatalogueItem(
    @Body() createCatalogueItemDto: CreateCatalogueItemDto,
  ) {
    return this.catalogueService.post(createCatalogueItemDto);
  }
}

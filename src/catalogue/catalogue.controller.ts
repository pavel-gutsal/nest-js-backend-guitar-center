import { Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { Body, Query } from '@nestjs/common/decorators';
import { CatalogueService } from './catalogue.service';
import { CatalogItem, CreateItemDto } from './dto/items/create-item.dto';
import { ItemQueryDto } from './dto/items/item-query.dto';
import { Category } from './types';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { UpdateItemDto } from './dto/items/update-item.dto';
import {
  CreateSpecsDto,
  SpecsFromServer,
} from './dto/specifications/create-specification.dto';
import { Product } from './types/product';

@ApiTags('catalogue')
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  //
  // item endpoints

  @Get(':category')
  @ApiOperation({
    summary:
      'filter parameters are applied to database, array of items is returned',
  })
  async getCatalogue(
    @Param('category') category: Category,
    @Query() itemQueryDto: ItemQueryDto,
  ) {
    return this.catalogueService.getAll(category, itemQueryDto);
  }

  @Get('/item/:model')
  @ApiResponse({ status: 200, type: CatalogItem })
  @ApiOperation({ summary: 'finds one item by model property' })
  async getItem(@Param('model') model: string): Promise<CatalogItem> {
    return this.catalogueService.getItem(model);
  }

  @Post('/item')
  @ApiOperation({ summary: 'creates item in database with unique model prop' })
  @ApiResponse({ status: 200, type: CatalogItem })
  async postItem(@Body() createItemDto: CreateItemDto): Promise<CatalogItem> {
    return this.catalogueService.postItem(createItemDto);
  }

  @Delete('/item/:model')
  @ApiOperation({ summary: 'deleted item by model prop' })
  async deleteItem(@Param('model') model: string) {
    return this.catalogueService.deleteItem(model);
  }

  @Patch('/item/:model')
  @ApiOperation({ summary: 'patches item by model prop' })
  async patchItem(
    @Param('model') model: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.catalogueService.patchItem(model, updateItemDto);
  }

  //
  // specs endpoints

  @Get('/specs/:model')
  @ApiOperation({ summary: 'get specification object by model param' })
  @ApiResponse({ status: 200, type: SpecsFromServer })
  async getSpecs(@Param('model') model: string): Promise<SpecsFromServer> {
    return this.catalogueService.getSpecs(model);
  }

  @Post('/specs')
  @ApiOperation({
    summary:
      'post specification object releted to item object with model param',
  })
  @ApiResponse({ status: 200, type: SpecsFromServer })
  async postSpecs(
    @Body() createSpecsDto: CreateSpecsDto,
  ): Promise<SpecsFromServer> {
    return this.catalogueService.postSpecs(createSpecsDto);
  }

  @Delete('/specs/:model')
  @ApiOperation({ summary: 'deleted Specification by model prop' })
  async deleteSpecs(@Param('model') model: string) {
    return this.catalogueService.deleteSpecs(model);
  }

  //
  //product endpoint

  @Get('/product/:model')
  @ApiOperation({
    summary: 'get specification and item objects by model param',
  })
  async getProduct(@Param('model') model: string): Promise<Product> {
    return this.catalogueService.getProduct(model);
  }
}

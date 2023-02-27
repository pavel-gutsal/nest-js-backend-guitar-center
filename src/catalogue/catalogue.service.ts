import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatalogueQueryDto } from './dto/catalogue-query.dto';
import { CreateCatalogueItemDto } from './dto/create-catalogueItem.dto';
import { Catalogue } from './schemas/catalogue.schema';
import { Category, SortBy } from './types';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectModel(Catalogue.name)
    private readonly catalogueModel: Model<Catalogue>,
  ) {}

  async getAll(category: Category, catalogueQueryDto: CatalogueQueryDto) {
    const { page, limit, sortBy } = catalogueQueryDto;

    const length = (await this.catalogueModel.find({ category })).length;

    const skippedItems = limit * (page - 1) >= length ? 0 : limit * (page - 1);

    const array = await this.catalogueModel
      .find({ category })
      .sort({ [sortBy]: sortBy === SortBy.DISCOUNTEDPRICE ? 1 : -1 })
      .skip(skippedItems)
      .limit(limit);

    return { array, length };
  }

  async post(createCatalogueItemDto: CreateCatalogueItemDto) {
    return this.catalogueModel.create({ ...createCatalogueItemDto });
  }
}

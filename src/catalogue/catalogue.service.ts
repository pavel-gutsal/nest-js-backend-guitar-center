import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemQueryDto } from './dto/items/item-query.dto';
import { CatalogItem, CreateItemDto } from './dto/items/create-item.dto';
import { UpdateItemDto } from './dto/items/update-item.dto';
import {
  CreateSpecsDto,
  SpecsFromServer,
} from './dto/specifications/create-specification.dto';
import { Item } from './schemas/catalogue.schema';
import { Specifications } from './schemas/Specifications.schema';
import { Category, SortBy } from './types';
import { Product } from './types/product';
import { LikedItemListDto } from 'src/userCart/dto/liked-item-list.dto';
import { ShoppingCartListDto } from 'src/userCart/dto/shopping-cart-list.dto';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
    @InjectModel(Specifications.name)
    private readonly specificationsModel: Model<Specifications>,
  ) {}

  //
  // items service methods

  normiliseModelText(text: string) {
    return text
      .trim()
      .toLowerCase()
      .replace(/[ .]/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  async getAll(category: Category, itemQueryDto: ItemQueryDto) {
    const { page, limit, sortBy } = itemQueryDto;

    const length = (await this.itemModel.find({ category })).length;

    const skippedItems = limit * (page - 1) >= length ? 0 : limit * (page - 1);

    const array = await this.itemModel
      .find({ category })
      .sort({ [sortBy]: sortBy === SortBy.DISCOUNTEDPRICE ? 1 : -1 })
      .skip(skippedItems)
      .limit(limit);

    return { array, length };
  }

  async getItem(model: string): Promise<CatalogItem> {
    return await this.itemModel.findOne({ model });
  }

  async validateItemExistence(model: string) {
    const item = await this.getItem(model);

    if (!item) {
      throw new NotFoundException('Item does not exist in database');
    }
  }

  async getLikedItemList(likedListItemDto: LikedItemListDto) {
    const { list } = likedListItemDto;
    return await this.itemModel.find().where('model').in(list).exec();
  }

  async getShoppingCartList(
    shoppingCartListDto: ShoppingCartListDto,
  ): Promise<CatalogItem[]> {
    const { list } = shoppingCartListDto;
    const normilizedList = list.map((cart) => cart.model);
    return await this.itemModel.find().where('model').in(normilizedList).exec();
  }

  async postItem(createItemDto: CreateItemDto): Promise<CatalogItem> {
    const model = this.normiliseModelText(createItemDto.name);

    const item = await this.getItem(model);

    if (item) {
      throw new ConflictException('Item with following model already exist');
    }

    return await this.itemModel.create({
      ...createItemDto,
      model,
    });
  }

  async deleteItem(model: string) {
    await this.validateItemExistence(model);

    return await this.itemModel.deleteOne({ model });
  }

  async patchItem(model: string, updateItemDto: UpdateItemDto) {
    await this.validateItemExistence(model);

    return await this.itemModel.updateOne({ model }, updateItemDto);
  }

  //
  // specs service methods

  async getSpecs(model: string): Promise<SpecsFromServer> {
    return await this.specificationsModel.findOne({ model });
  }

  async validateSpecsExistence(model: string) {
    const specItem = await this.getSpecs(model);

    if (!specItem) {
      throw new NotFoundException('Specification does not exist in database');
    }
  }

  async postSpecs(createSpecsDto: CreateSpecsDto): Promise<SpecsFromServer> {
    const { model } = createSpecsDto;

    const specItem = await this.specificationsModel.findOne({ model });

    if (specItem) {
      throw new ConflictException(
        'Specification with following model already exist',
      );
    }

    return await this.specificationsModel.create(createSpecsDto);
  }

  async deleteSpecs(model: string) {
    await this.validateSpecsExistence(model);

    return await this.specificationsModel.deleteOne({ model });
  }

  //
  // product service method

  async getProduct(model: string): Promise<Product> {
    const item = await this.getItem(model);
    const details = await this.getSpecs(model);

    if (!item || !details) {
      return { item: null, details: null, error: 'product not found' };
    }

    return { item, details, error: null };
  }
}

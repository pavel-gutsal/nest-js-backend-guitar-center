import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { UserCart } from '../schemas/userCart.schema';

export class UserCartClass extends UserCart {
  _id: Types.ObjectId;
}

export class Cart {
  @ApiProperty()
  model: string;

  @ApiProperty()
  number: number;
}

export class CartResponse {
  @ApiProperty()
  cart: Cart[];

  @ApiProperty()
  liked: string[];
}

export enum ModifyOption {
  INCART = 'inCart',
  ISLIKED = 'isLiked',
}

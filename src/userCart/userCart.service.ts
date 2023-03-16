import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserCart } from './schemas/userCart.schema';
import { Cart, CartResponse, ModifyOption, UserCartClass } from './types';

@Injectable()
export class UserCartService {
  constructor(
    @InjectModel(UserCart.name)
    private readonly userCartModel: Model<UserCart>,
  ) {}

  async getUserCart(email: string): Promise<CartResponse> {
    const response: UserCartClass = await this.userCartModel.findOne({ email });

    if (!response) {
      throw new NotFoundException('Item does not exist in database');
    }

    return { liked: response.liked, cart: response.cart } as CartResponse;
  }

  async createUserCart(email: string): Promise<CartResponse> {
    const response = await this.userCartModel.create({
      email,
      liked: [],
      cart: [],
    });
    return { liked: response.liked, cart: response.cart } as CartResponse;
  }

  toggleContent(userCart: CartResponse, updateCartDto: UpdateCartDto) {
    let { liked, cart } = userCart;
    const { model, option } = updateCartDto;

    if (option === ModifyOption.ISLIKED) {
      const isLiked = liked.includes(model);

      liked = isLiked ? liked.filter((el) => el !== model) : [...liked, model];
      return { liked };
    } else {
      const inCart = cart.some((el) => el.name === model);

      cart = inCart
        ? cart.filter((el) => el.name !== model)
        : [...cart, { name: model, number: 1 }];

      return { cart };
    }
  }

  async updateUserCart(email: string, updateCartDto: UpdateCartDto) {
    const userCart = await this.getUserCart(email);

    const update = this.toggleContent(userCart, updateCartDto);

    const updatedCart = await this.userCartModel.findOneAndUpdate(
      { email },
      update,
      { new: true },
    );
    return updatedCart;
  }

  async updateSpecificCart(email: string, cartDto: Cart) {
    const userCart = await this.getUserCart(email);

    const { cart } = userCart;

    const updaredCartArray = userCart.cart.map((cart) =>
      cart.name === cartDto.name ? cartDto : cart,
    );

    const updatedCart = await this.userCartModel.findOneAndUpdate(
      { email },
      { cart: updaredCartArray },
      { new: true },
    );
    return updatedCart;
  }
}

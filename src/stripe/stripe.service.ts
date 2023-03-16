import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from 'src/catalogue/schemas/catalogue.schema';
import Stripe from 'stripe';
import { CartCheckoutDto } from './dto/checkout.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<Item>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async getItems(cartCheckoutDto: CartCheckoutDto) {
    const { list } = cartCheckoutDto;
    const normilizedList = list.map((cart) => cart.model);
    return await this.itemModel.find().where('model').in(normilizedList).exec();
  }

  async checkout(email: string, cartCheckoutDto: CartCheckoutDto) {
    const catalogueItems = await this.getItems(cartCheckoutDto);
    try {
      return await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: catalogueItems.map((item) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
              },
              unit_amount: item.discountedPrice * 100,
            },
            quantity:
              cartCheckoutDto.list.find((el) => el.model === item.model)
                ?.number || 0,
          };
        }),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/error`,
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'something gone wrong during checkout',
      );
    }
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isNil } from 'lodash';
import { Model } from 'mongoose';
import { Item } from 'src/catalogue/schemas/catalogue.schema';
import Stripe from 'stripe';
import { CartCheckoutDto } from './dto/checkout.dto';
import { PaymentIntent } from './types';

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

  async calculateTotalPrice(cartCheckoutDto: CartCheckoutDto) {
    const { list } = cartCheckoutDto;
    const normilizedList = list.reduce((prev, curr) => {
      if (curr.number < 1) return prev;
      return [...prev, curr.model];
    }, [] as string[]);

    const items = await this.itemModel
      .find()
      .where('model')
      .in(normilizedList)
      .exec();

    const price = items.reduce((prev, curr) => {
      const number = list.find((el) => el.model === curr.model)?.number || 1;
      return prev + curr.discountedPrice * number;
    }, 0);

    return price;
  }

  async paymentIntent(
    email: string,
    cartCheckoutDto: CartCheckoutDto,
  ): Promise<PaymentIntent> {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

    if (isNil(publishableKey)) {
      throw new InternalServerErrorException('failed to fetch publishable key');
    }

    const amount = await this.calculateTotalPrice(cartCheckoutDto);

    const paymentIntent = await this.stripe.paymentIntents.create({
      currency: 'USD',
      amount,
      automatic_payment_methods: { enabled: true },
    });

    if (!paymentIntent) {
      throw new InternalServerErrorException(
        'something gone wrong during checkout',
      );
    }

    return {
      publishableKey,
      clientSecret: paymentIntent.client_secret,
    };
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CartCheckoutDto } from './dto/checkout.dto';
import { StripeService } from './stripe.service';
import { PaymentIntent } from './types';

@Controller('stripe')
@UseGuards(AuthGuard())
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('payment-intent')
  async paymentIntent(
    @GetUser() email: string,
    @Body() cartCheckoutDto: CartCheckoutDto,
  ): Promise<PaymentIntent> {
    return this.stripeService.paymentIntent(email, cartCheckoutDto);
  }
}

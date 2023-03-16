import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CartCheckoutDto } from './dto/checkout.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
@UseGuards(AuthGuard())
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async checkout(
    @GetUser() email: string,
    @Body() cartCheckoutDto: CartCheckoutDto,
  ) {
    return this.stripeService.checkout(email, cartCheckoutDto);
  }
}

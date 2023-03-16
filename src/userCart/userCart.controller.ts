import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { CatalogueService } from 'src/catalogue/catalogue.service';
import { LikedItemListDto } from './dto/liked-item-list.dto';
import { Cart, ShoppingCartListDto } from './dto/shopping-cart-list.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartResponse } from './types';
import { UserCartService } from './userCart.service';

@ApiTags('userCart')
@Controller('usercart')
@UseGuards(AuthGuard())
export class UserCartController {
  constructor(
    private readonly catalogueService: CatalogueService,
    private readonly userCartService: UserCartService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'finds already created userCart object on signin / validate',
  })
  @ApiResponse({ status: 200, type: CartResponse })
  async getUserCart(@GetUser() email: string): Promise<CartResponse> {
    return await this.userCartService.getUserCart(email);
  }

  @Get('create-new')
  @ApiOperation({ summary: 'creates empty userCart object on signup' })
  @ApiResponse({ status: 200, type: CartResponse })
  async createUserCart(@GetUser() email: string): Promise<CartResponse> {
    return await this.userCartService.createUserCart(email);
  }

  @Post('liked')
  async getLikedList(@Body() likedItemListDto: LikedItemListDto) {
    return await this.catalogueService.getLikedItemList(likedItemListDto);
  }

  @Post('shop-cart')
  async getShoppingCartList(@Body() shoppingCartListDto: ShoppingCartListDto) {
    return await this.catalogueService.getShoppingCartList(shoppingCartListDto);
  }

  @Patch()
  @ApiOperation({ summary: 'patches userCart object' })
  async updateUserCart(
    @GetUser() email: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return await this.userCartService.updateUserCart(email, updateCartDto);
  }

  @Patch('cart')
  async updateSpecificCart(@GetUser() email: string, @Body() cartDto: Cart) {
    return await this.userCartService.updateSpecificCart(email, cartDto);
  }
}

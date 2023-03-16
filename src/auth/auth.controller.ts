import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { UserCartService } from 'src/userCart/userCart.service';
import { AuthService } from './auth.service';
import { SignupCredentialsDto, SigninCredentialsDto } from './dto';
import { GetUser } from './get-user.decorator';
import { IToken } from './types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userCartService: UserCartService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body() signupCredentialsDto: SignupCredentialsDto,
  ): Promise<IToken> {
    const { email } = signupCredentialsDto;

    const token = await this.authService.createUser(signupCredentialsDto);

    if (token) {
      await this.userCartService.createUserCart(email);
    }

    return token;
  }

  @Post('/signin')
  async signIn(
    @Body() signinCredentialsDto: SigninCredentialsDto,
  ): Promise<IToken> {
    return this.authService.signIn(signinCredentialsDto);
  }

  @Get('/validate')
  @UseGuards(AuthGuard())
  validate(@GetUser() userEmail: string) {
    return this.authService.validate(userEmail);
  }
}

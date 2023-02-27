import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupCredentialsDto, SigninCredentialsDto } from './dto';
import { GetUser } from './get-user.decorator';
import { IToken } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() signupCredentialsDto: SignupCredentialsDto,
  ): Promise<IToken> {
    return this.authService.createUser(signupCredentialsDto);
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
    return this.validate(userEmail);
  }
}

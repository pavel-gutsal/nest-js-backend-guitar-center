import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupCredentialsDto, SigninCredentialsDto } from './dto';
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

  // for tests purposes
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Request() req) {
    console.log(req);
  }
}

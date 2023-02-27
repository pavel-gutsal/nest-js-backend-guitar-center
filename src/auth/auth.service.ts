import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { SignupCredentialsDto, SigninCredentialsDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IToken } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: UserDocument): Promise<IToken> {
    const payload = { id: user._id };

    const accessToken = await this.jwtService.sign(payload);

    const response: IToken = {
      name: user.name,
      token: `Bearer ${accessToken}`,
    };

    return response;
  }

  async hashPassword(password: string): Promise<string> {
    // generate salt for password
    const salt = await bcrypt.genSalt(10);

    // hash password
    return await bcrypt.hash(password, salt);
  }

  async createUser(
    signupCredentialsDto: SignupCredentialsDto,
  ): Promise<IToken> {
    const { name, email, password } = signupCredentialsDto;

    try {
      const user: UserDocument = await this.userModel.create({
        name,
        email,
        password: await this.hashPassword(password),
      });
      return this.generateToken(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('email already in use');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signinCredentialsDto: SigninCredentialsDto): Promise<IToken> {
    const { email, password } = signinCredentialsDto;

    const user: UserDocument = await this.userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.generateToken(user);
    } else {
      throw new UnauthorizedException('wrong email or password');
    }
  }

  async validate(userEmail: string) {
    const user: UserDocument = await this.userModel.findOne({
      email: userEmail,
    });

    if (user) {
      return this.generateToken(user);
    } else {
      throw new UnauthorizedException('json web token invalid');
    }
  }
}

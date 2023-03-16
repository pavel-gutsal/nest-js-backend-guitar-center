import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchema, Auth } from './schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserCartService } from 'src/userCart/userCart.service';
import { UserCart, UserCartSchema } from '../userCart/schemas/userCart.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: UserCart.name, schema: UserCartSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService, UserCartService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

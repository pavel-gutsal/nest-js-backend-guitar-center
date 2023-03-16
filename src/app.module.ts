import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './tasks/task.module';
import { AuthModule } from './auth/auth.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { ReviewModule } from './review/review.module';
import { UserCartModule } from './userCart/userCart.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // we need ConfigModule as imports or error
      inject: [ConfigService], // we need ConfigService as inject or error
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    TaskModule,
    AuthModule,
    CatalogueModule,
    ReviewModule,
    UserCartModule,
    StripeModule,
  ],
})
export class AppModule {}

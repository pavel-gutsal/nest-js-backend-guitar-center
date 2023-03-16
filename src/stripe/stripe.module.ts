import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { CatalogueSchema, Item } from 'src/catalogue/schemas/catalogue.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: CatalogueSchema }]),
    AuthModule,
  ],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}

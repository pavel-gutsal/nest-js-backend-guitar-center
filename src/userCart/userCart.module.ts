import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CatalogueService } from 'src/catalogue/catalogue.service';
import { CatalogueSchema, Item } from 'src/catalogue/schemas/catalogue.schema';
import {
  Specifications,
  SpecificationsSchema,
} from 'src/catalogue/schemas/Specifications.schema';
import { UserCart, UserCartSchema } from './schemas/userCart.schema';
import { UserCartController } from './userCart.controller';
import { UserCartService } from './userCart.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCart.name, schema: UserCartSchema },
      { name: Item.name, schema: CatalogueSchema },
      { name: Specifications.name, schema: SpecificationsSchema },
    ]),
    AuthModule,
  ],
  controllers: [UserCartController],
  providers: [UserCartService, CatalogueService],
})
export class UserCartModule {}

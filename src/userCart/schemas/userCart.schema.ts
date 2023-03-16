import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cart } from '../types';

@Schema({ timestamps: true })
export class UserCart extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: [String] })
  liked: string[];

  @Prop({ required: true, type: [Object] })
  cart: Cart[];
}

export const UserCartSchema = SchemaFactory.createForClass(UserCart);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from '../types';

@Schema({ timestamps: true })
export class Catalogue extends Document {
  @Prop({ required: true })
  category: Category;

  @Prop({ required: true, type: String })
  model: string;

  @Prop({ required: true, type: String })
  mainPhoto: string;

  @Prop({ required: true, type: String })
  rating: string;

  @Prop({ required: true, type: Number })
  totalPrice: number;

  @Prop({ required: true, type: Number })
  discountedPrice: number;

  @Prop({ required: true, type: Boolean, default: false })
  bestSeller: boolean;

  @Prop({ required: true, type: Object })
  shortSpecs: string[][];
}

export const CatalogueSchema = SchemaFactory.createForClass(Catalogue);

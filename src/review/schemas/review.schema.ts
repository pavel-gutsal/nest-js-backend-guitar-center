import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/catalogue/types';

@Schema({ timestamps: false })
export class Review extends Document {
  @Prop({ required: true, type: String, enum: Category })
  device: Category;

  @Prop({ required: true, type: String })
  author: string;

  @Prop({ required: true, type: Number })
  rating: number;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ required: true, type: Object })
  pros: string[];

  @Prop({ required: true, type: Object })
  cons: string[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

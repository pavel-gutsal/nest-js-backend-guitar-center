import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryUpercase, Specification, SpecsBrief } from '../types';

@Schema({ timestamps: true })
export class Specifications extends Document {
  @Prop({ required: true })
  category: CategoryUpercase;

  @Prop({ required: true, type: String, unique: true })
  model: string;

  @Prop({ required: true, type: Number })
  comments: number;

  @Prop({ required: true, type: Object })
  specsBriefIcon: SpecsBrief;

  @Prop({ required: true, type: [String] })
  photos: string[];

  @Prop({ required: true, type: Object })
  specifications: Specification;
}

export const SpecificationsSchema =
  SchemaFactory.createForClass(Specifications);

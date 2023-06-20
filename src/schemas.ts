import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String, unique: true })
  title: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: Number })
  rating: number;
}

export type MovieDocument = HydratedDocument<Movie>;
export const MovieSchema = SchemaFactory.createForClass(Movie);

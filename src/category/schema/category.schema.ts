import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface CategoryModel extends Document {
    name: string;
}

@Schema({ timestamps: true })
export class Category {
    @Prop({ type: String })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);



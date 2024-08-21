import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';


export interface SubCategoryModel extends Document {
    name: string,
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
}


@Schema({ timestamps: true })
export class SubCategory {

    @Prop()
    name: String

    @Prop()
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }]

}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);


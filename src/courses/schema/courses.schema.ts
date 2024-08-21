import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export interface CoursesModel extends Document {
    name: string,
    categories: [{ type: Types.ObjectId, ref: 'category' }],
    subCategories: [{ type: Types.ObjectId, ref: 'subcategories' }],
}


@Schema({ timestamps: true })
export class Courses {

    @Prop()
    name: String

    @Prop({ default: 1 })
    categories: [{ type: Types.ObjectId, ref: 'category' }]

    @Prop()
    subCategories: [{ type: Types.ObjectId, ref: 'subcategories' }]

}

export const CoursesSchema = SchemaFactory.createForClass(Courses);


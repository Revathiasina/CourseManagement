import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorySchema } from './schema/sub-category.schema';
import { CategorySchema } from 'src/category/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'subcategories', schema: SubCategorySchema }]),
    MongooseModule.forFeature([{ name: 'category', schema: CategorySchema }]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule { }

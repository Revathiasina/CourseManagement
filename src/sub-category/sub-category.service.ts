import { Injectable } from '@nestjs/common';
import { SubCategoryModel } from './schema/sub-category.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CategoryModel } from 'src/category/schema/category.schema';

@Injectable()
export class SubCategoryService {
    constructor
        (
            @InjectModel('subcategories')
            private readonly subCategoryModel: Model<SubCategoryModel>,

            @InjectModel('category')
            private readonly categoryModel: Model<CategoryModel>
        ) { }

    /**
     * ### Function to create or update sub category
     */
    async createOrUpdateSubCategory(data: Record<string, any>) {
        try {
            const { _id, ...rest } = data;

            const category = await this.categoryModel.findById(rest.category);

            if (!category) {
                throw new Error('Category not found');
            }

            rest['category'] = [category._id]

            const result = await this.subCategoryModel.findOneAndUpdate(
                { _id: _id || new mongoose.Types.ObjectId() },
                { $set: rest },
                { new: true, upsert: true },
            );

            return {
                success: true,
                message: "Sub Category created or updated successfully",
                response: result
            };
        } catch (error) {
            // console.log(error)
            return { success: false, message: 'Error in creating SubCategory' };
        }
    }

    /**
     * ### Fuction to get sub categories
     */
    async getSubCategory() {
        try {
            const response = await this.subCategoryModel.find();
            return {
                success: true,
                message: "SUb Categories fetched successfully",
                data: response
            };
        } catch (error) {
            return { success: false, message: 'Error in fetching SubCategory' };
        }
    }

    /**
     * ### Function to delete categories
     */
    async deleteSubCategory(id: any) {
        try {
            const response = await this.subCategoryModel.deleteOne({ _id: id })
            return {
                success: true,
                message: "Sub Category deleted successfully",
                data: response
            };
        } catch (error) {
            return { success: false, message: 'Error in deleting SubCategory' };
        }
    }
}

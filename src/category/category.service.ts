import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CategoryModel } from './schema/category.schema';

@Injectable()
export class CategoryService {

    constructor
        (
            @InjectModel('category')
            private readonly categoryModel: Model<CategoryModel>
        ) { }


    /**
     * ### Functiont to fetch category name and count of the subcategories linked to category
     * @returns {name:'',subCategories:5}
     */
    async getCategoriesCount() {
        try {
            const getAggregatorData: any = [
                {
                    $lookup: {
                        from: 'subcategories',
                        localField: '_id',
                        foreignField: 'category',
                        as: 'subCategories',
                    },
                },
                {
                    $project: {
                        name: 1,
                        subCategoryCount: { $size: '$subCategories' },
                    },
                },
            ];

            // console.log(JSON.stringify(getAggregatorData), ' getAggregatorData');

            let result = await this.categoryModel.aggregate(getAggregatorData);
            // console.log(result, 'result')
            return {
                status: HttpStatus.OK,
                message: 'Category and sub category count fetched successfully',
                response: result
            }
        } catch (error) {
            return { success: false, message: 'Error in fetching category and sub category count' };
        }
    }

    /**
     * ### Function to create or update category
     */
    async createOrUpdateCategory(payload: Record<string, any>) {
        try {
            const { _id, ...rest } = payload;
            const result = await this.categoryModel.findOneAndUpdate(
                { _id: _id || new mongoose.Types.ObjectId() },
                { $set: rest },
                { new: true, upsert: true },
            );

            return {
                success: true,
                message: "Category created or updated successfully",
                response: result
            };
        } catch (error) {
            // console.log(error)
            return { success: false, message: 'Error in creating categories' };
        }
    }

    /**
     * ### Fuction to get categories
     */
    async getCategory() {
        try {
            const response = await this.categoryModel.find()
            return {
                success: true,
                message: "Categories fetched successfully",
                data: response
            };
        } catch (error) {
            return { success: false, message: 'Error in fetching categories' };
        }
    }

    /**
     * ### Function to delete categories
     */
    async deleteCategory(id: any) {
        try {
            const response = await this.categoryModel.deleteOne({ _id: id })
            return {
                success: true,
                message: "Category deleted successfully",
                data: response
            };
        } catch (error) {
            return { success: false, message: 'Error in deleting categories' };
        }
    }
}

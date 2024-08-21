import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CoursesModel } from './schema/courses.schema';

@Injectable()
export class CoursesService {

    constructor
        (
            @InjectModel('course')
            private readonly coursesModel: Model<CoursesModel>
        ) { }

    /**
     * ### Function to create or update courses
     */
    async createOrUpdateCourses(data: Record<string, any>) {
        try {
            const { _id, ...rest } = data;

            const result = await this.coursesModel.findOneAndUpdate(
                { _id: _id || new mongoose.Types.ObjectId() },
                { $set: rest },
                { new: true, upsert: true },
            );

            return {
                success: true,
                message: "COurse created or updated successfully",
                response: result
            };
        } catch (error) {
            return { success: false, message: 'Error in creating courses' };
        }
    }

    /**
     * ### Fuction to get courses
     */
    async getCourses() {
        try {
            const response = await this.coursesModel.find()
            return {
                success: true,
                message: "Courses fetched successfully",
                data: response
            };
        } catch (error) {
            return { success: false, message: 'Error in fetching courses' };
        }
    }

    /**
     * ### Function to delete courses
     */
    async deleteCourse(data: Record<string, any>) {
        try {
            const response = await this.coursesModel.deleteOne({ code: data.code });
            return {
                success: true,
                message: "Courses deleted successfully",
                data: response
            };
        } catch (error) {
            return { success: false, message: 'Error in deleting courses' };
        }
    }
}
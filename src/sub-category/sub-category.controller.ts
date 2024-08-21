import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';

@Controller('subcategories')
export class SubCategoryController {

  constructor(private readonly subCategoryService: SubCategoryService) { }

  @Post()
  async createOrUpdateCourses(@Body() course: Record<string, any>) {
    return await this.subCategoryService.createOrUpdateSubCategory(course)
  }

  @Get()
  async getCourses() {
    return await this.subCategoryService.getSubCategory()
  }

  @Delete()
  async deleteCourse(@Query() query: any) {
    return await this.subCategoryService.deleteSubCategory(query._id)
  }
}

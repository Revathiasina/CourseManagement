import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getCategory() {
    return await this.categoryService.getCategory()
  }

  @Get('/subCategory')
  async getCategoriesCount() {
    return await this.categoryService.getCategoriesCount()
  }

  @Post()
  async createCategory(@Body() category: Record<string, any>) {
    return await this.categoryService.createOrUpdateCategory(category)
  }

  @Delete()
  async deletCategory(@Query() query: any) {
    return await this.categoryService.deleteCategory(query._id)
  }
}

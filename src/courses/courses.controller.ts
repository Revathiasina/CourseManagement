import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  async createOrUpdateCourses(@Body() course: Record<string, any>) {
    return await this.coursesService.createOrUpdateCourses(course)
  }

  @Get()
  async getCourses() {
    return await this.coursesService.getCourses()
  }

  @Delete()
  async deleteCourse(@Param() param: any) {
    return await this.coursesService.deleteCourse(param)
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CoursesSchema } from './schema/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'course', schema: CoursesSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

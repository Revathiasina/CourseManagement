import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { CoursesModule } from './courses/courses.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CategoryModule, CoursesModule, SubCategoryModule,
    MongooseModule.forRoot(
      `mongodb+srv://revathiasina13:Da5xIHyXPz6dNQjD@cluster0.cu0e6fl.mongodb.net/coursemanagement?retryWrites=true&w=majority&appName=Cluster0`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

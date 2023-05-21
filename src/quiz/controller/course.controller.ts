import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CourseDto } from '../dto/coursedto';
import { CourseQuestionDto } from '../dto/coursequestiondto';
import { AdminInterceptor } from '../interceptors/admininterceptor';

@Controller('admin')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post('/course')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AdminInterceptor)
  async createCourse(@Body() dto: CourseDto) {
    return this.courseService.createCourse(dto);
  }

  @Post('/course/:courseid/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AdminInterceptor)
  async createCourseQuestion(
    @Body() dto: CourseQuestionDto,
    @Param('courseid') courseid: number,
  ) {
    return this.courseService.createQuestion(dto, courseid);
  }
}

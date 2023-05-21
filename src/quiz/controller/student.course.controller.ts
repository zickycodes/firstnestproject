import {
  Body,
  Controller,
  Param,
  Query,
  Post,
  UseGuards,
  UsePipes,
  Get,
  Put,
  Request,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExamStartDto } from '../dto/ExamStartDto';
import { QuestAnswerDto } from '../dto/QuestAnsdto';
import { PaymentInterceptor } from 'src/students/payment.interceptor';
// import { InjectModel } from '@nestjs/sequelize';
// import { CourseDto } from '../dto/coursedto';
// import { CourseQuestionDto } from '../dto/coursequestiondto';
// import { AdminInterceptor } from '../interceptors/admininterceptor';

@Controller()
export class StudentCourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get('/eligible/courses')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaymentInterceptor)
  async fetchCourse(@Request() req) {
    return this.courseService.fetchEliibleCourses(req.user.userId);
  }

  @Post('/examstart')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaymentInterceptor)
  @UsePipes(new ValidationPipe())
  async examstart(@Request() req, @Body() dto: ExamStartDto) {
    // console.log(req.user);
    return this.courseService.examstart(req.user.userId, dto);
  }

  @Put('/examsend')
  @UseGuards(JwtAuthGuard)
  async examsend(@Request() req, @Body() dto: ExamStartDto) {
    return this.courseService.examsend(req.user.userId, dto);
  }

  @Get('/course/:courseid')
  @UseGuards(JwtAuthGuard)
  async getCourse(
    @Param('courseid') courseId: string | number,
    @Query('quest') quest: string | number,
    @Request() req,
  ) {
    // console.log(courseId);
    // console.log(quest);
    return this.courseService.getCourseQuestions(
      courseId,
      quest,
      req.user.userId,
    );
  }

  @Post('/course/:coursequestionid')
  @UseGuards(JwtAuthGuard)
  async postAns(
    @Param('coursequestionid') coursequestionId: string | number,
    @Request() req,
    @Body() dto: QuestAnswerDto,
  ) {
    return this.courseService.postCourseAns(
      coursequestionId,
      req.user.userId,
      dto,
    );
  }

  @Get('/results')
  @UseGuards(JwtAuthGuard)
  async getResults(@Request() req) {
    console.log('gey');
    return this.courseService.getResults(req.user.userId);
  }
}

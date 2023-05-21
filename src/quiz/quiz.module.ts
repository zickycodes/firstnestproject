import { Module } from '@nestjs/common';
import { Course } from 'src/entities/Course';
import { CourseQuestion } from 'src/entities/CourseQuestion';
import { CourseQuestionAnswer } from 'src/entities/CourseQuestionAnswer';
import { CourseController } from './controller/course.controller';
import { CourseService } from './services/course.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminInterceptor } from './interceptors/admininterceptor';
import { StudentCourseController } from './controller/student.course.controller';
import { Student } from 'src/entities/Student.personal.info';
import { ExamDetail } from 'src/entities/ExamDetails';
import { StudentPayment } from 'src/entities/Student.payment';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Course,
      CourseQuestion,
      CourseQuestionAnswer,
      Student,
      ExamDetail,
      StudentPayment,
    ]),
  ],
  controllers: [CourseController, StudentCourseController],
  providers: [CourseService, AdminInterceptor],
})
export class QuizModule {}

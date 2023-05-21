import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/entities/Course';
import { CourseQuestion } from 'src/entities/CourseQuestion';
import { Student } from 'src/entities/Student.personal.info';
import { CourseDto } from '../dto/coursedto';
import { CourseQuestionDto } from '../dto/coursequestiondto';
import { ExamDetail } from 'src/entities/ExamDetails';
import { ExamStartDto } from '../dto/ExamStartDto';
import { CourseQuestionAnswer } from 'src/entities/CourseQuestionAnswer';
import { QueryTypes } from 'sequelize';
import { QuestAnswerDto } from '../dto/QuestAnsdto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseModel: typeof Course,
    @InjectModel(CourseQuestion) private questionModel: typeof CourseQuestion,
    @InjectModel(Student) private studentModel: typeof Student,
    @InjectModel(ExamDetail) private examDetail: typeof ExamDetail,
    @InjectModel(CourseQuestionAnswer)
    private courseQuestionAnswer: typeof CourseQuestionAnswer,
  ) {}
  async createCourse(dto: CourseDto) {
    try {
      await this.courseModel.create({
        title: dto.title,
        courselevel: dto.courselevel,
      });
      return {
        statusCode: 201,
        message: 'Course added successfully',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createQuestion(dto: CourseQuestionDto, courseid: number | string) {
    try {
      await this.questionModel.create({
        ...dto,
        courseId: courseid,
      });
      return {
        statusCode: 201,
        message: 'Course question added successfully',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async fetchEliibleCourses(id: number | string) {
    try {
      const { level } = await this.studentModel.findOne({
        where: { userId: id },
      });

      const eligibleCourses = await this.courseModel.findAll({
        where: {
          courselevel: level,
        },
      });

      const eligibleCoursesList = eligibleCourses.map((course) => ({
        courseId: course.id,
        title: course.title,
      }));

      return { status: 200, message: eligibleCoursesList };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async examstart(id: number | string, dto: ExamStartDto) {
    try {
      this.examDetail.create({
        ...dto,
        userId: id,
      });
      return {
        status: '200',
        message: 'Exams have started',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async examsend(id: number | string, dto: ExamStartDto) {
    try {
      await this.examDetail.update({ ...dto }, { where: { userId: id } });
      return {
        status: '201',
        message: 'Exams have ended',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getCourseQuestions(
    courseId: string | number,
    quest: string | number,
    userId: string | number,
  ) {
    try {
      const examDetail = await this.examDetail.findOne({ where: { userId } });
      if (!examDetail.examsstart) {
        throw new BadGatewayException('Your exam time is up');
      }
      if (examDetail.examsstart && !examDetail.examsend) {
        if (!quest) {
          // const { level } = await this.studentModel.findOne({ where: { id } });
          const question = await this.questionModel.findOne({
            where: { questionnumber: '1', courseId },
          });
          return {
            status: '200',
            message: {
              courseId: question.courseId,
              course_question: question.Coursequestion,
              question_number: question.questionnumber,
              course_question_id: question.id,
            },
          };
        } else {
          const question = await this.questionModel.findOne({
            where: { questionnumber: quest, courseId },
          });
          return {
            status: '200',
            message: {
              courseId: question.courseId,
              course_question: question.Coursequestion,
              question_number: question.questionnumber,
              course_question_id: question.id,
            },
          };
        }
      } else {
        throw new BadGatewayException('Your exam time is up');
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async postCourseAns(
    coursequestionId: string | number,
    userId: string | number,
    dto: QuestAnswerDto,
  ) {
    try {
      const userAnswer = await this.courseQuestionAnswer.findOne({
        where: { CourseQuestionId: coursequestionId, userId: userId },
      });

      if (userAnswer) {
        await this.courseQuestionAnswer.update(
          {
            ...dto,
          },
          { where: { CourseQuestionId: coursequestionId, userId: userId } },
        );
        return {
          status: 200,
          message: 'Anwser Updated Sucessfully',
          data: {
            ans: dto.studentAnswers,
          },
        };
      } else {
        await this.courseQuestionAnswer.create({
          ...dto,
          CourseQuestionId: coursequestionId,
          userId: userId,
        });
        return {
          status: 200,
          message: 'Anwser added sucessfully',
          data: {
            ans: dto.studentAnswers,
          },
        };
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getResults(userId) {
    const { message } = await this.fetchEliibleCourses(userId);
    // console.log(message);
    const results = [];

    for (let i = 0; i < message.length; i++) {
      const { courseId, title } = message[i];
      const grade = (await this.courseQuestionAnswer.sequelize.query(
        `SELECT "CourseQuestionAnswers"."studentAnswers" = "CourseQuestions"."CourseAnwser" AS "Match",
      COUNT("CourseQuestionAnswers"."studentAnswers" = "CourseQuestions"."CourseAnwser") AS "MatchCount"
      FROM "CourseQuestionAnswers"
      JOIN "CourseQuestions" ON "CourseQuestionAnswers"."CourseQuestionId" = "CourseQuestions"."id"
      WHERE "CourseQuestionAnswers"."userId" = ? AND "CourseQuestions"."courseId" = ?
      GROUP BY "Match";`,
        { replacements: [userId, courseId], type: QueryTypes.SELECT },
      )) as { Match: boolean; MatchCount: number }[];
      if (grade[1] === undefined) {
        results.push({
          title,
          failedattempts: parseInt(String(grade[0].MatchCount)),
          passed: 0,
        });
      } else {
        results.push({
          title,
          passed: parseInt(String(grade[1].MatchCount)),
        });
      }
    }
    return {
      statusCode: 200,
      data: results,
    };
  }
}

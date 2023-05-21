import { Module } from '@nestjs/common';
import * as redis from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/modules/users/users.module';
import { ExamDetail } from './entities/ExamDetails';
import { CourseQuestionAnswer } from './entities/CourseQuestionAnswer';
import { CourseQuestion } from './entities/CourseQuestion';
import { User } from './entities/User';
import { Course } from './entities/Course';
import { StudentPayment } from './entities/Student.payment';
import { StudentFileUploads } from './entities/students.paths.file';
import { StudentTraining } from './entities/students.training.info';
import { StudentContact } from './entities/Student.contact';
import { Student } from './entities/Student.personal.info';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/modules/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/exceptions';
// import { Sequelize } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
// import { UploadGateway } from './upload.gateway';
import { StudentModule } from './students/student.module';
import { PaymentModule } from './payments/payment.module';
import * as Flutterwave from 'flutterwave-node-v3';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('PG_Host'),
        port: parseInt(configService.get('PG_Port'), 10),
        username: configService.get('PG_Username'),
        password: configService.get('PG_Pass'),
        database: configService.get('PG_Name'),
        models: [
          User,
          Student,
          Course,
          CourseQuestion,
          ExamDetail,
          CourseQuestionAnswer,
          StudentFileUploads,
          StudentContact,
          StudentTraining,
          StudentPayment,
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: process.env.Mailer_User,
          pass: process.env.Mailer_Pass,
        },
      },
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    StudentModule,
    PaymentModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // UploadGateway,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: 'SequelizeToken',
      useFactory: async (sequelize: Sequelize) => sequelize,
      inject: [Sequelize],
    },
    {
      provide: 'RedisToken',
      useFactory: (configService: ConfigService) => {
        return redis.createClient({
          host: configService.get('Redis_Host'),
          port: parseInt(configService.get('Redis_Port'), 10),
        });
      },
      inject: [ConfigService],
    },

    {
      provide: Flutterwave,
      useFactory: (configService: ConfigService) => {
        return new Flutterwave(
          configService.get('Flutterwave_1'),
          configService.get('Flutterwave_2'),
        );
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

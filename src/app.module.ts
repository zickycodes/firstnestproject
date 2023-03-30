import { Module } from '@nestjs/common';
import * as redis from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/modules/users/users.module';
import { User } from './entities/User';
import { Course } from './entities/Course';
import { Student } from './entities/Students';
import { AuthModule } from './auth/auth.module';
import { ExamCourse } from './entities/ExamCourse';
import { EmailModule } from './email/modules/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/exceptions';
// import { Sequelize } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'zicky',
      database: 'nestdb',
      models: [User, Student, Course, ExamCourse],
      autoLoadModels: true,
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: 'godsgiftuduak2@gmail.com',
          pass: 'wjhrslegsmemuamz',
        },
      },
    }),
    UsersModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
      useValue: redis.createClient({
        host: '127.0.0.1',
        port: '6379',
      }),
    },
  ],
})
export class AppModule {}

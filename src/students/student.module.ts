import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentUploadController } from './controller/student.uploaddetails.controller';
import { StudentUploadService } from './services/student.upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { StudentFileUploads } from 'src/entities/students.paths.file';
import { StudentProfileController } from './controller/student.personaldetails.controller';
import { StudentPersonalDetailService } from './services/student.personaldetails.service';
import { Student } from 'src/entities/Student.personal.info';
import { PaymentInterceptor } from './payment.interceptor';
import { StudentPayment } from 'src/entities/Student.payment';
import { UploadGateway } from 'src/upload.gateway';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    SequelizeModule.forFeature([StudentFileUploads, Student, StudentPayment]),
  ],
  controllers: [StudentUploadController, StudentProfileController],
  providers: [
    UploadGateway,
    StudentUploadService,
    PaymentInterceptor,
    StudentPersonalDetailService,
  ],
})
export class StudentModule {}

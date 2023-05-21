import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from 'src/entities/Student.personal.info';
import { StudentDetailDto } from '../dtos/studentdetailsdto';
// import { StudentFileUploads } from 'src/entities/students.paths.file';

@Injectable()
export class StudentPersonalDetailService {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}

  async studentpersonal(dto: StudentDetailDto, userId: string | number) {
    try {
      const dateOfBirth = new Date(dto.dateofbirth);
      // console.log(dateOfBirth);
      await this.studentModel.create({
        ...dto,
        userId,
      });

      return {
        message: 'Details saved',
        status: 200,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

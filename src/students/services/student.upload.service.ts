import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentFileUploads } from 'src/entities/students.paths.file';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class StudentUploadService {
  constructor(
    @InjectModel(StudentFileUploads)
    private studentFileUploads: typeof StudentFileUploads,
  ) {}

  clearImage = (filePath) => {
    if (filePath === null) {
      return;
    }
    filePath = path.join(process.cwd(), filePath);
    fs.unlink(filePath, (err) => console.log(err));
  };

  async uploadWaec(waecresult: string, userId: number) {
    const student = await this.studentFileUploads.findOne({
      where: {
        userId,
      },
    });
    // console.log('student', student);
    if (!student) {
      await this.studentFileUploads.create({ userId, waecresult });
    } else {
      this.clearImage(student.waecresult);
      await this.studentFileUploads.update(
        { waecresult },
        { where: { userId } },
      );
    }
  }

  async uploadJamb(jambresult: string, userId: number) {
    const student = await this.studentFileUploads.findOne({
      where: {
        userId,
      },
    });
    // console.log('student', student);
    if (!student) {
      await this.studentFileUploads.create({ userId, jambresult });
    } else {
      this.clearImage(student.jambresult);
      await this.studentFileUploads.update(
        { jambresult },
        { where: { userId } },
      );
    }
  }

  async uploadFSLCfile(fslc: string, userId: number) {
    const student = await this.studentFileUploads.findOne({
      where: {
        userId,
      },
    });
    // console.log('student', student);
    if (!student) {
      await this.studentFileUploads.create({ userId, fslc });
    } else {
      this.clearImage(student.fslc);
      await this.studentFileUploads.update({ fslc }, { where: { userId } });
    }
  }

  async uploadLGAfile(lga: string, userId: number) {
    const student = await this.studentFileUploads.findOne({
      where: {
        userId,
      },
    });
    // console.log('student', student);
    if (!student) {
      await this.studentFileUploads.create({ userId, lga });
    } else {
      this.clearImage(student.fslc);
      await this.studentFileUploads.update({ lga }, { where: { userId } });
    }
  }
}

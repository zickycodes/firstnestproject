import {
  Table,
  Column,
  Model,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';
import { Student } from './Student.personal.info';
import { StudentPayment } from './Student.payment';
import { ExamDetail } from './ExamDetails';
import { StudentFileUploads } from './students.paths.file';
import { StudentTraining } from './students.training.info';
import { StudentContact } from './Student.contact';
import { CourseQuestion } from './CourseQuestion';
import { CourseQuestionAnswer } from './CourseQuestionAnswer';

@Table
export class User extends Model {
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Email is required' }, // add a validation message
    },
  })
  email: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  password: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  role: string;

  @Column
  refreshToken: string;

  @HasOne(() => Student)
  student: Student;

  @HasOne(() => StudentPayment)
  studentpayment: StudentPayment;

  @HasOne(() => ExamDetail)
  examdetail: ExamDetail;

  @HasOne(() => StudentFileUploads)
  studentfileuploads: StudentFileUploads;

  @HasOne(() => StudentTraining)
  studenntraining: StudentTraining;

  @HasOne(() => StudentContact)
  studentcontact: StudentContact;

  @BelongsToMany(() => CourseQuestion, () => CourseQuestionAnswer)
  courseQuestions: CourseQuestion[];
}

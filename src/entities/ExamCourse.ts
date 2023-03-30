import { Table, ForeignKey, Column, Model } from 'sequelize-typescript';
import { Course } from './Course';
import { Student } from './Students';

@Table
export class ExamCourse extends Model {
  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @ForeignKey(() => Student)
  @Column
  studentId: number;

  @Column
  examstart: Date;

  @Column
  examend: Date;
}

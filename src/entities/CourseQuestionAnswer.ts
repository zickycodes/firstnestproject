import { Table, ForeignKey, Column, Model } from 'sequelize-typescript';
import { CourseQuestion } from './CourseQuestion';
import { User } from './User';

@Table
export class CourseQuestionAnswer extends Model {
  @ForeignKey(() => CourseQuestion)
  @Column
  CourseQuestionId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  studentAnswers: string;
}

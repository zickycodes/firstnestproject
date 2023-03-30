import {
  Table,
  Column,
  Model,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from './Course';
import { User } from './User';
import { ExamCourse } from './ExamCourse';

@Table
export class Student extends Model {
  @Column
  firstName: string;

  @Column
  middlename: string;

  @Column
  Lastname: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Course, () => ExamCourse)
  courses: Course[];
}

import { BelongsToMany, Table, Model, Column } from 'sequelize-typescript';
import { Student } from './Students';
import { ExamCourse } from './ExamCourse';

@Table
export class Course extends Model {
  @Column
  title: string;

  @BelongsToMany(() => Student, () => ExamCourse)
  students: Student[];
}

import { HasMany, Table, Model, Column } from 'sequelize-typescript';
import { CourseQuestion } from './CourseQuestion';

@Table
export class Course extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column
  title: string;

  @Column
  courselevel: string;

  @HasMany(() => CourseQuestion)
  coursequestion: CourseQuestion[];
}

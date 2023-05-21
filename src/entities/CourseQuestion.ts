import {
  Table,
  ForeignKey,
  Column,
  Model,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from './Course';
import { CourseQuestionAnswer } from './CourseQuestionAnswer';
import { User } from './User';

@Table
export class CourseQuestion extends Model {
  @ForeignKey(() => Course)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Course question is required' }, // add a validation message
    },
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Course question is required' }, // add a validation message
    },
  })
  Coursequestion: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Course question is required' }, // add a validation message
    },
  })
  questionnumber: string;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Course answer is required' }, // add a validation message
    },
  })
  CourseAnwser: string;

  @BelongsToMany(() => User, () => CourseQuestionAnswer)
  users: User[];

  // @Column
  // examstart: Date;

  // @Column
  // examend: Date;
}

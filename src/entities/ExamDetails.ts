import {
  BelongsTo,
  ForeignKey,
  Table,
  Model,
  Column,
} from 'sequelize-typescript';
import { User } from './User';

@Table
export class ExamDetail extends Model {
  @ForeignKey(() => User)
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // add a validation message
    },
  })
  examsstart: Date;

  @Column
  examsend: Date;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'exams duration is required' }, // add a validation message
    },
  })
  @Column
  examsduration: number;
}

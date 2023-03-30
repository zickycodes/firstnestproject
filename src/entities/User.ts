import { Table, Column, Model, HasOne } from 'sequelize-typescript';
import { Student } from './Students';

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

  @Column
  role: string;

  @Column
  refreshToken: string;

  @HasOne(() => Student)
  student: Student;
}

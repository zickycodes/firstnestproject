import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';

@Table
export class StudentPayment extends Model {
  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint
    validate: {
      notNull: { msg: 'Password is required' }, // addvalidation message
    },
  })
  amount: number;

  @Column({
    allowNull: false, // set the allowNull option to false to enforce not null constraint,
    unique: true,
    validate: {
      notNull: { msg: 'Paymentid is required' }, // addvalidation message
    },
  })
  paymentid: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    unique: true, // Add unique constraint
    validate: {
      notNull: { msg: 'User is required' },
    },
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

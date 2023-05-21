import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from './User';

@Table
export class StudentContact extends Model {
  @Column
  phoneno: number;

  @Column
  country: string;

  @Column
  address: string;

  @Column
  state: string;

  @Column
  LGA: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    unique: true, // Add unique constraint
    validate: {
      notNull: { msg: 'Student is required' },
    },
  })
  userId: number;

  @BelongsTo(() => User)
  student: User;
}

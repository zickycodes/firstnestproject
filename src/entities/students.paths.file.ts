import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from './User';

@Table
export class StudentFileUploads extends Model {
  @Column
  waecresult: string;

  @Column
  jambresult: string;

  @Column
  fslc: string;

  @Column
  lga: string;

  @Column
  letterofrecommendation: string;

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
  student: User;
}

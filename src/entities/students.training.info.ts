import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from './User';

@Table
export class StudentTraining extends Model {
  @Column
  Nameofsecondaryschool: string;

  @Column
  Yearofstartsecondary: Date;

  @Column
  Yearofendsecondary: Date;

  @Column
  NameofPrimarySchool: string;

  @Column
  Yearofstartprimary: Date;

  @Column
  Yearofendprimary: Date;

  @Column
  letterofrecommendation: string;

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

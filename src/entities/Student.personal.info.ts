import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';

@Table
export class Student extends Model {
  @Column
  firstname: string;

  @Column
  middlename: string;

  @Column
  lastname: string;

  @Column
  dateofbirth: Date;

  @Column
  maritalstatus: string;

  @Column
  NOK: string;

  @Column
  Nokrelationship: string;

  @Column
  Nokphonenumber: string;

  @Column
  Sponsor: string;

  @Column
  Relationshipwithsponsor: string;

  @Column
  Sponsorphonenumber: string;

  @Column
  level: string;

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

  // @BelongsToMany(() => CourseQuestion, () => CourseQuestionAnswer)
  // coursequestions: CourseQuestion[];
}

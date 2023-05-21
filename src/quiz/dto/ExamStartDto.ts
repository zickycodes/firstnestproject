import { IsNotEmpty } from 'class-validator';

export class ExamStartDto {
  @IsNotEmpty()
  examsstart: Date;
  @IsNotEmpty()
  examsduration: number;
}

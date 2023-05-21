import { IsNotEmpty } from 'class-validator';

export class ExamStartDto {
  @IsNotEmpty()
  examsend: Date;
}

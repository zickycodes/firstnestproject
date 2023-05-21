import { IsNotEmpty, IsString } from 'class-validator';

export class CourseQuestionDto {
  @IsNotEmpty()
  @IsString()
  Coursequestion: string;
  @IsNotEmpty()
  @IsString()
  CourseAnwser: string;
  @IsNotEmpty()
  @IsString()
  questionnumber: string;
}

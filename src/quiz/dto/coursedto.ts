import { IsNotEmpty, IsString } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  courselevel: string;
}

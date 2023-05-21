import { IsNotEmpty, IsString } from 'class-validator';

export class QuestAnswerDto {
  @IsNotEmpty()
  @IsString()
  studentAnswers: string;
}

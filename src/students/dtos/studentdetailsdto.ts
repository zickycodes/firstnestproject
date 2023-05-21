import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class StudentDetailDto {
  @IsNotEmpty()
  firstname: string;
  @IsOptional()
  middlename: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  // @IsDateString()
  dateofbirth: Date;
  @IsNotEmpty()
  maritalstatus: string;
  @IsNotEmpty()
  NOK: string;
  @IsNotEmpty()
  Nokrelationship: string;
  @IsNotEmpty()
  Nokphonenumber: number;
  @IsNotEmpty()
  Sponsor: string;
  @IsNotEmpty()
  Relationshipwithsponsor: string;
  @IsNotEmpty()
  Sponsorphonenumber: string;
  @IsNotEmpty()
  level: string;
}

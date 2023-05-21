import {
  Controller,
  Body,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { StudentPersonalDetailService } from '../services/student.personaldetails.service';
import { StudentDetailDto } from '../dtos/studentdetailsdto';
import { PaymentInterceptor } from '../payment.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/student')
export class StudentProfileController {
  constructor(private readonly studentService: StudentPersonalDetailService) {}
  @Post('/personal-details')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(PaymentInterceptor)
  @UsePipes(new ValidationPipe())
  async uploadDetails(@Body() dto: StudentDetailDto, @Request() req: any) {
    // console.log('dto', dto);
    // console.log('user', req.user);
    return await this.studentService.studentpersonal(dto, req.user.userId);
    // console.log(req.user);
  }
}

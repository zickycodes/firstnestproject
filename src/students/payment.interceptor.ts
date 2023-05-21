import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import { StudentPayment } from 'src/entities/Student.payment';

@Injectable()
export class PaymentInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(StudentPayment)
    private studentPaymentModel: typeof StudentPayment,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.user.userId);
    const userWhoHasPaid = await this.studentPaymentModel.findOne({
      where: {
        userId: request.user.userId,
      },
    });

    if (!userWhoHasPaid) {
      throw new BadRequestException('User has not paid');
    }
    // Access the data service methods and properties

    // Rest of the interceptor logic here
    // ...
    return next.handle();
  }
}

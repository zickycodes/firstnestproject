import {
  Controller,
  Inject,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Body,
  Post,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CheckPaymentDto } from '../dto/checkpayment.dto';
import * as Flutterwave from 'flutterwave-node-v3';
import { StudentPayment } from 'src/entities/Student.payment';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/payment')
export class PaymentController {
  constructor(
    @Inject(Flutterwave) private readonly flutterwave: Flutterwave,
    @InjectModel(StudentPayment)
    private studentPaymentModel: typeof StudentPayment,
  ) {}

  // @Get()
  // async webHooksCheck() {}

  @Post('/clientcheck')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async clientCheck(@Body() dto: CheckPaymentDto, @Request() req: any) {
    // console.log(dto);
    // console.log(req.user);
    // console.log(this.flutterwave);
    try {
      const transactionDetails = await this.flutterwave.Transaction.verify({
        id: dto.transaction_id,
      });
      // console.log(transactionDetails);
      await this.studentPaymentModel.create({
        userId: req.user.userId,
        amount: transactionDetails.data.amount,
        paymentid: dto.transaction_id,
      });
      return {
        status: 200,
        message: 'Payment successful',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // @Post('/webhookcheck')
  // async webHooks(@Request() req: any) {
  //   const secretHash = 'joha';
  //   const signature = req.headers['verif-hash'];
  //   if (!signature || signature !== secretHash) {
  //     // This request isn't from Flutterwave; discard
  //     throw new BadRequestException("This request isn't from Flutterwave");
  //   }
  //   const payload = req.body;
  //   // It's a good idea to log all received events.
  //   console.log(payload);
  // }
}

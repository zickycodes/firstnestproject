import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentPayment } from 'src/entities/Student.payment';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Flutterwave from 'flutterwave-node-v3';

@Module({
  imports: [
    SequelizeModule.forFeature([StudentPayment]),
    ConfigModule, // Add ConfigModule import here
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: Flutterwave,
      useFactory: (configService: ConfigService) => {
        return new Flutterwave(
          configService.get('Flutterwave_1'),
          configService.get('Flutterwave_2'),
        );
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentModule {}

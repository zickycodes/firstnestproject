import { Controller, Get, Query, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import * as Flutterwave from 'flutterwave-node-v3';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Flutterwave) private readonly flutterwave: Flutterwave,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // http://localhost:3000/payment-callback?status=successful&tx_ref=hooli-tx-1920bbtyttp&transaction_id=4260810
  // @Get('/payment-callback')
  // async paymentCallback(@Query() query: any) {
  //   console.log('query', query);
  //   if (query.status === 'successful') {
  //     // const transactionDetails = await this.flutterwave.Transaction.find({
  //     //   ref: query.tx_ref,
  //     // });
  //     // console.log('TD', transactionDetails);
  //     console.log('fl', this.flutterwave);
  //     const response = await this.flutterwave.Transaction.verify({
  //       id: '4266148',
  //     });
  //     console.log('resp', response);
  //   }
  // }
}

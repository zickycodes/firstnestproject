import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPaymentDto {
  @IsNotEmpty()
  @IsString()
  status: string;
  @IsNotEmpty()
  @IsString()
  tx_ref: string;
  @IsNotEmpty()
  @IsString()
  transaction_id: string;
}

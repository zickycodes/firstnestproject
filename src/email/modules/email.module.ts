import { Module } from '@nestjs/common';
import { EmailListener } from 'src/email/email.listener';

@Module({
  imports: [],
  providers: [EmailListener],
})
export class EmailModule {}

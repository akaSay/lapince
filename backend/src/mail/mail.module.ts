import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // Assurez-vous que MailService est exporté
})
export class MailModule {}

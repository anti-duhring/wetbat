import { Module } from '@nestjs/common';
import { QuoteModule } from './modules/quote/quote.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [QuoteModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

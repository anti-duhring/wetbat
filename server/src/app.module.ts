import { Module } from '@nestjs/common';
import { QuoteModule } from './modules/quote/quote.module';
import { ContactModule } from './modules/contact/contact.module';
import { AirportModule } from './modules/airport/airport.module';

@Module({
  imports: [QuoteModule, ContactModule, AirportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

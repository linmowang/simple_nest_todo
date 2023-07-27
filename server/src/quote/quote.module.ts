import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [QuoteController],
})
export class QuoteModule {}

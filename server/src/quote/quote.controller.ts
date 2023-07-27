import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { SkipJwtAuth } from 'src/auth/contants';

const randomQuoteApi = 'http://api.quotable.io/random';

@ApiTags('名人名言')
@SkipJwtAuth()
@Controller('quote')
export class QuoteController {
  constructor(private httpService: HttpService) {}

  @Get()
  async getQuote() {
    const response$ = await this.httpService.get(randomQuoteApi);
    const response = await lastValueFrom(response$);
    return response.data;
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipJwtAuth } from './auth/contants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('主应用')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SkipJwtAuth()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import {
  Body,
  Post,
  Request,
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipJwtAuth } from './contants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('登录验证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @SkipJwtAuth()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return {
      user: req.user,
    };
  }
}

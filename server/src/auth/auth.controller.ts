import {
  Body,
  Post,
  Request,
  Controller,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipJwtAuth } from './contants';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local_auth.guard';

@ApiTags('登录验证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return {
      user: req.user,
    };
  }
}

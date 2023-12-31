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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local_auth.guard';
import { JwtAuthGuard } from './guard/jwt_auth.guard';
import { LoginDto } from './dto/LoginDto';

@ApiTags('登录验证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return {
      user: req.user,
    };
  }
}

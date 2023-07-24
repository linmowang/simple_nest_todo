import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './contants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './guard/jwt_auth.guard';
import { LocalAuthGuard } from './guard/local_auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: LocalAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

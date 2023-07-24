import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { jwtConstants, IS_PUBLIC_KEY } from '../contants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   throw new UnauthorizedException();
    // }

    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: jwtConstants.secret,
    //   });
    //   request('user') = payload;
    // } catch {
    //   throw new UnauthorizedException();
    // }

    // 自定义用户身份验证逻辑
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // skip
    if (isPublic) return true;

    return super.canActivate(context);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

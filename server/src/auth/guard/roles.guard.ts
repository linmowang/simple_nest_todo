import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../contants';
import { Reflector } from '@nestjs/core';
import { UserService } from '../..//user/user.service';

// 管理员权限模块 先放着
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    // 自定义用户身份验证逻辑
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // skip
    if (isPublic) return true;
    return true;
  }
}

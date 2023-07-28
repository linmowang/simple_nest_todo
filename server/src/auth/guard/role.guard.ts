import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/user.service';
import { Role_Key } from '../../role/role.decorator';

// 管理员权限模块 先放着
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    // 自定义用户身份验证逻辑
    const requireRole = this.reflector.getAllAndOverride<boolean>(Role_Key, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRole) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    const adminUser = await this.userService.checkAdmin(user.id);
    return !!adminUser;
  }
}

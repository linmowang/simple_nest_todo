import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

export class WsJwtAuthGuard extends AuthGuard('ws_jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new WsException('没有登录');
    }

    return user;
  }
}

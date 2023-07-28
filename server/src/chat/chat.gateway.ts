import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageData } from './chat.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/guard/ws_jwt_auth.guard';

@WebSocketGateway({
  path: '/chat/socket.io',
  cors: { origin: 'http://localhost:3000' },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('clientToServer')
  async clientToServer(
    @MessageBody() clientData: MessageData,
  ): Promise<MessageData> {
    console.log('客服消息：', clientData.content);
    return { content: '你好，很高兴为你服务' };
  }

  @UseGuards(WsJwtAuthGuard)
  @Cron(CronExpression.EVERY_10_SECONDS)
  sayHi() {
    this.server.emit('serverToClient', { content: '你还在吗？' });
  }
}

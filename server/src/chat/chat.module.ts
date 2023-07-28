import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { WsJwtStrategy } from '../auth/strategy/ws_jwt_strategy';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [UserModule, ScheduleModule.forRoot()],
  providers: [ChatGateway, WsJwtStrategy],
})
export class ChatModule {}

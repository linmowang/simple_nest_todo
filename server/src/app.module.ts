import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'abc123',
      database: 'nest_todo',
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, //是否自动将实体类同步到数据库
      autoLoadEntities: true, //如果为true,将自动加载实体forFeature()方法注册的每个实体都将自动添加到配置对象的实体
    }),
    UserModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

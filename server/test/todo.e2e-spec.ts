import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Todo, TodoStatus } from '../src/todo/entities/todo.entity';
import { User } from '../src/user/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoModule } from '../src/todo/todo.module';
import { AuthModule } from '../src/auth/auth.module';
import { TodoService } from '../src/todo/todo.service';
import { UserService } from '../src/user/user.service';
import * as request from 'supertest';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';
import { log } from 'console';
import { Repository } from 'typeorm';

describe('TodoController (e2e)', () => {
  const typeOrmModule = TypeOrmModule.forRoot({
    type: 'mariadb',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'abc123',
    database: 'nest_todo',
    entities: [User, Todo],
  });

  let app: INestApplication;
  let breaerToken: string;
  let createdTodo: Todo;

  beforeAll(async (done) => {
    const moduleFixTure: TestingModule = await Test.createTestingModule({
      imports: [TodoModule, AuthModule, typeOrmModule],
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    app = moduleFixTure.createNestApplication();
    await app.init();

    // 生成测试用户的Token
    request(app.getHttpServer())
      .post('http://localhost:4200/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testuser',
      })
      .expect(201)
      .expect((res) => {
        breaerToken = `Bearer ${res.body.token}`;
      })
      .end(done);
  });

  it('GET /todo', (done) => {
    log('Authorization', breaerToken);
    return request(app.getHttpServer())
      .get('http://localhost:4200/api/todo')
      .set('Authorization', breaerToken)
      .expect(200)
      .expect((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body instanceof Array).toBeTruthy();
        expect(res.body.length >= 3).toBeTruthy();
      })
      .end(() => {
        done();
      });
  });

  it('POST /todo', (done) => {
    const newTodo: CreateTodoDto = {
      title: 'todo999',
      description: 'desc999',
      status: TodoStatus.TODO,
      media: '',
    };
    return request(app.getHttpServer())
      .post('/todo')
      .set('Authorization', breaerToken)
      .send(newTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toEqual(newTodo.title);
        expect(res.body.description).toEqual(newTodo.description);
        expect(res.body.status).toEqual(TodoStatus.TODO);
      })
      .end(done);
  });

  it('PATCH /todo/:id', (done) => {
    const updatingTodo: UpdateTodoDto = {
      title: 'todo8888',
      description: 'desc8888',
    };
    return request(app.getHttpServer())
      .patch(`/todo/${createdTodo.id}`)
      .set('Authorization', breaerToken)
      .send(updatingTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toEqual(updatingTodo.title);
        expect(res.body.description).toEqual(updatingTodo.description);
      })
      .end(done);
  });

  it('DELETE /todo/:id', (done) => {
    return request(app.getHttpServer())
      .delete(`/todo/${createdTodo.id}`)
      .set('Authorization', breaerToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toEqual(createdTodo.id);
      })
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
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

    service = module.get<TodoService>(TodoService);
    controller = module.get<TodoController>(TodoController);
  });

  it('findAll', async () => {
    const todo = new Todo();
    todo.id = 0;
    todo.description = 'description';
    todo.title = 'title';
    const result: Todo[] = [todo];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(await controller.findAll()).toBe(result);
  });
});

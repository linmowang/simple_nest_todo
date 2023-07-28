import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(id: number, createTodoDto: CreateTodoDto) {
    const user = await this.userService.findOneById(id);
    const { title, description, media, status } = createTodoDto;
    const todo = new Todo();
    todo.author = user;
    todo.title = title;
    todo.description = description;
    todo.media = media;
    todo.status = status || TodoStatus.TODO;
    todo.author = user;
    return this.todoRepository.save(todo);
  }

  findAll() {
    return this.todoRepository.find();
  }

  async findAllByUserId(id: number): Promise<Todo[]> {
    const user = await this.userService.findOneByIdToTodos(id);

    return user ? user.todos : [];
  }

  findOne(id: number) {
    return this.todoRepository.findOne({ where: { id } });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: number) {
    return this.todoRepository.delete({ id });
  }
}

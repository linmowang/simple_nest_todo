import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('待办事项')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Request() request, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(request.user.id, createTodoDto);
  }

  @Get()
  findAll(@Request() request) {
    const { id, is_admin } = request.user;
    if (is_admin === 1) {
      return this.todoService.findAll();
    } else {
      return this.todoService.findAllByUserId(id);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.todoService.remove(+id);
  }
}

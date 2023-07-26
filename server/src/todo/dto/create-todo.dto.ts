import { IsAlphanumeric, IsNumber, IsString } from 'class-validator';
import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsAlphanumeric()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  status?: TodoStatus;

  @IsString()
  media: string;
}

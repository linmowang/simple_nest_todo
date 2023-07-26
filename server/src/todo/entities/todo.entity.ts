import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatus {
  TODO = 0,
  DONE = 1,
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description?: string;

  @Column('int', { default: TodoStatus.TODO })
  status: TodoStatus;

  @Column('text')
  media?: string;

  @ManyToOne(() => User, (user) => user.todos)
  author: User;
}

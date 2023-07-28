import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 500 })
  username: string;

  @ApiProperty()
  @Exclude()
  @Column({ length: 500 })
  password: string;

  @ApiProperty()
  @Column({ length: 500 })
  email: string;

  @ApiProperty()
  @Column('int', { default: 1 })
  is_admin?: number;

  @OneToMany(() => Todo, (todo) => todo.author, { cascade: true })
  todos: Todo[];

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}

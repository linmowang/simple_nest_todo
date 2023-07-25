import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Exclude()
  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  email: string;

  @Column('int', { default: 1 })
  is_admin?: number;

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}

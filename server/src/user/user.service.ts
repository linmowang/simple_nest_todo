import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;

    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByIdToTodos(id: number) {
    return await this.userRepository.findOne({
      relations: ['todos'],
      where: { id },
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const result = await this.userRepository.findOne({ where: { id } });
    const { password: ignorePass, ...resetUser } = result;
    return resetUser;
  }

  async findByName(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}

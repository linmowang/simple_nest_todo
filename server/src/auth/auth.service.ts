import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const existUser = await this.userService.findByName(username);
    if (!existUser) {
      throw null;
    }

    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return null;
    }

    const { password: ignorePass, ...resetUser } = existUser;
    return resetUser;
  }

  async login(user: User) {
    const { password, ...resetUser } = user;

    const payload = { ...resetUser, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      user: resetUser,
      expiresIn: jwtConstants.expiresIn,
    };
  }
}

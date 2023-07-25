import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const existUser = await this.userService.findOne(username);
    if (!existUser) {
      throw null;
    }

    const isMatch = password === existUser.password;
    // const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return null;
    }

    const { password: ignorePass, ...resetUser } = existUser;
    return resetUser;
  }

  async login(user: any) {
    const { password, ...resetUser } = user;

    const payload = { ...resetUser, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      user: resetUser,
      expiresIn: jwtConstants.expiresIn,
    };
  }
}

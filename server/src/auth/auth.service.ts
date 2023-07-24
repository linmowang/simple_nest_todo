import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    // const { password, ...result } = user;
    const payload = { sub: user.userId, username: user.username };
    // TODO: Geranerate a JWT and return it here
    // instead of the user object
    return {
      access_tooke: await this.jwtService.signAsync(payload),
    };
  }
}

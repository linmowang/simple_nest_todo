import { IsEmail, IsString, MaxLength, isAlphanumeric } from 'class-validator';

export class CreateUserDto {
  // @isAlphanumeric()
  @MaxLength(14)
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}

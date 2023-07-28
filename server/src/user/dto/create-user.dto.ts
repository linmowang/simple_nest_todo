import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, isAlphanumeric } from 'class-validator';

export class CreateUserDto {
  // @isAlphanumeric()
  @ApiProperty()
  @MaxLength(14)
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

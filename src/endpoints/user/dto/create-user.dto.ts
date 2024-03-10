import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends PickType(UserDto, ['id', 'password']) {
  @IsNotEmpty({ message: 'Login is required and should not be null' })
  @IsString({ message: 'Login should be a string' })
  login: string;

  @IsNotEmpty({ message: 'Password is required and should not be null' })
  @IsString({ message: 'Password should be a string' })
  password: string;
}

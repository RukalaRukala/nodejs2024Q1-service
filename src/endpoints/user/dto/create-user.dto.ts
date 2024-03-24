import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends PickType(UserDto, ['login', 'password']) {
  @IsNotEmpty({ message: '<<login>> is required and should not be null' })
  @IsString({ message: '<<login>> should be a string' })
  login: string;

  @IsNotEmpty({ message: '<<password>> is required and should not be null' })
  @IsString({ message: '<<password>> should be a string' })
  password: string;
}

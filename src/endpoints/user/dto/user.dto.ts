import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserDto extends PartialType(CreateUserDto) {
  id: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

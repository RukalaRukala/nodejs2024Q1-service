import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { db } from '../../dataBase/db';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users: UserDto[];

  constructor() {
    this.users = db.users;
  }

  create(createUserDto: CreateUserDto) {
    const currentTime = new Date().getTime();
    const newUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    } as UserDto;

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === `${id}`);
  }

  updatePassword(id: string, updateUserDto: UpdatePasswordDto) {
    const chosenUser = this.users.find(user => user.id === id);
    if (chosenUser.password === updateUserDto.oldPassword) {
      this.users = this.users.filter(user => user.id !== id);
      this.users.push({ ...chosenUser, password: updateUserDto.newPassword });
      return updateUserDto;
    }
    throw new ForbiddenException('Old password is wrong');
  }

  remove(id: string) {
    this.users = this.users.filter(user => user.id !== id);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}

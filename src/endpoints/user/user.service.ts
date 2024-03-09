import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { db } from '../../dataBase/db';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  private users: UserDto[];

  constructor() {
    this.users = db.users;
  }

  create(createUserDto: unknown) {
    const currentTime = new Date().getTime();
    const newUser = {
      id: uuidv4(),
      login: (createUserDto as CreateUserDto).login,
      password: (createUserDto as CreateUserDto).password,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    } as UserDto;

    this.users.push(newUser);
    console.log(db.users);
    return { ...newUser, password: undefined } as UserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const validId = this.validateUserId(id);
    return this.users.find(user => user.id === `${validId}`);
  }

  updatePassword(id: string, updateUserDto: UpdatePasswordDto) {
    const validId = this.validateUserId(id);
    const chosenUser = this.users.find(user => user.id === validId);
    if (
      chosenUser.password === (updateUserDto as UpdatePasswordDto).oldPassword
    ) {
      chosenUser.version += 1;
      chosenUser.updatedAt = new Date().getTime();
      this.users = this.users.filter(user => user.id !== validId);
      this.users.push({
        ...chosenUser,
        password: (updateUserDto as UpdatePasswordDto).newPassword,
      });
      return {
        ...this.users.find(user => user.id === validId),
        password: undefined,
      } as UserDto;
    }
    throw new ForbiddenException('Old password is wrong');
  }

  remove(id: string) {
    const validId = this.validateUserId(id);
    this.users = this.users.filter(user => user.id !== validId);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }

  validateUserId(id: string) {
    const usersIds = this.users.map(user => user.id);
    const isNotUserWithId = !usersIds.includes(id);
    if (!isUUID(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (isNotUserWithId) {
      throw new NotFoundException("User with this id doesn't exist");
    }
    return id;
  }

  // validateDto(value: unknown, props: string[]) {
  //   const dto = value;
  //
  //   for (const field of props) {
  //     if (!dto[field]) {
  //       throw new BadRequestException(`The '${field}' field is required.`);
  //     }
  //   }
  //
  //   return dto;
  // }
}

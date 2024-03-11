import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { db } from '../../dataBase/db';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUser } from '../../dataBase/dataBase.model';

@Injectable()
export class UserService {
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

    db.users.push(newUser);
    return { ...newUser, password: undefined };
  }

  findAll() {
    const users: IUser[] = db.users.map(user => ({
      ...user,
      password: undefined,
    }));
    return users;
  }

  findOne(id: string) {
    return { ...db.users.find(user => user.id === id), password: undefined };
  }

  updatePassword(id: string, updateUserDto: UpdatePasswordDto) {
    const chosenUser = db.users.find(user => user.id === id);
    if (chosenUser.password === updateUserDto.oldPassword) {
      chosenUser.version += 1;
      chosenUser.updatedAt = new Date().getTime();
      db.users = db.users.filter(user => user.id !== id);
      db.users.push({
        ...chosenUser,
        password: updateUserDto.newPassword,
      });
      return {
        ...db.users.find(user => user.id === id),
        password: undefined,
      };
    }
    throw new ForbiddenException('Old password is wrong');
  }

  remove(id: string) {
    db.users = db.users.filter(user => user.id !== id);
  }
}

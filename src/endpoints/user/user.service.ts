import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { db } from '../../dataBase/db';
import { UserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
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

    db.users.push(newUser);
    return { ...newUser, password: undefined } as UserDto;
  }

  findAll() {
    return db.users;
  }

  findOne(id: string) {
    return db.users.find(user => user.id === id);
  }

  updatePassword(id: string, updateUserDto: UpdatePasswordDto) {
    const chosenUser = db.users.find(user => user.id === id);
    if (chosenUser.password === updateUserDto.oldPassword) {
      chosenUser.version += 1;
      chosenUser.updatedAt = new Date().getTime();
      db.users = db.users.filter(user => user.id !== id);
      db.users.push({
        ...chosenUser,
        password: (updateUserDto as UpdatePasswordDto).newPassword,
      });
      return {
        ...db.users.find(user => user.id === id),
        password: undefined,
      } as UserDto;
    }
    throw new ForbiddenException('Old password is wrong');
  }

  remove(id: string) {
    db.users = db.users.filter(user => user.id !== id);
  }
}

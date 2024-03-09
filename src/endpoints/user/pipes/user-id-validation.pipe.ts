import {
  PipeTransform,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { db } from '../../../dataBase/db';

@Injectable()
export class UserIdValidationPipe implements PipeTransform {
  transform(id: any) {
    const usersIds = db.users.map(user => user.id);
    const isNotUserWithId = !usersIds.includes(id);
    if (!isUUID(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (isNotUserWithId) {
      throw new NotFoundException("User with this id doesn't exist");
    }
    return id;
  }
}

import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../../dataBase/db';

@Injectable()
export class ExistValidatePipe
  implements PipeTransform<{ route: unknown; id: string }, string>
{
  transform({ route, id }) {
    const type = route.path.split('/')[1];
    const isExist = db[type + 's'].some(item => item.id === id);
    if (!isExist) {
      throw new NotFoundException(
        `${type.toUpperCase()} with this id doesn't exist`
      );
    }
    return id;
  }
}

import { Injectable } from '@nestjs/common';
import { IDataBaseFields } from '../dataBase/dataBase.model';

@Injectable()
export class ValidateService {
  doesIdExists(id: string, data: IDataBaseFields) {
    const ids = data.map(item => item.id);
    return ids.includes(id);
  }
}

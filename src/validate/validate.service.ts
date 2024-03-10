import { Injectable } from '@nestjs/common';
import { IDataBaseFields } from '../dataBase/dataBase.model';

@Injectable()
export class ValidateService {
  isRequiredFields(dto: unknown, props: string[]) {
    for (const field of props) {
      console.log(dto[field]);
      if (!dto[field]) {
        return false;
      }
    }
    return true;
  }

  doesIdExists(id: string, data: IDataBaseFields) {
    const ids = data.map(item => item.id);
    return ids.includes(id);
  }
}

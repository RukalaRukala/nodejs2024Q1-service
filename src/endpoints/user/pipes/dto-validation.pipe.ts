import {
  Injectable,
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import 'reflect-metadata';

@Injectable()
export class DtoValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): CreateUserDto {
    const createUserDto: CreateUserDto = value;
    const requiredFields = Object.keys(new metadata.metatype());

    for (const field of requiredFields) {
      if (!createUserDto[field]) {
        throw new BadRequestException(`The '${field}' field is required.`);
      }
    }

    return createUserDto;
  }
}

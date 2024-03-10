import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty({ message: 'Id is required and should not be null' })
  @IsString({ message: 'Id should be a string' })
  id: string;
}

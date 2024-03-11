import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty({ message: '<<id>> is required and should not be null' })
  @IsString({ message: '<<id>> should be a string' })
  id: string;
}

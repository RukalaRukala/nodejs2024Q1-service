import { OmitType } from '@nestjs/mapped-types';
import { ArtistDto } from './artist.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto extends OmitType(ArtistDto, ['id']) {
  @IsNotEmpty({ message: '<<name>> is required and should not be null' })
  @IsString({ message: '<<name>> should be a string' })
  name: string;

  @IsNotEmpty({ message: '<<grammy>> is required and should not be null' })
  @IsBoolean({ message: '<<grammy>> should be a boolean' })
  grammy: boolean;
}

import { OmitType } from '@nestjs/mapped-types';
import { ArtistDto } from './artist.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto extends OmitType(ArtistDto, ['id']) {
  @IsNotEmpty({ message: 'Name is required and should not be null' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsNotEmpty({ message: 'Grammy is required and should not be null' })
  @IsBoolean({ message: 'Grammy should be a boolean' })
  grammy: boolean;
}

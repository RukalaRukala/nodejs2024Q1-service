import { OmitType } from '@nestjs/mapped-types';
import { AlbumDto } from './album.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto extends OmitType(AlbumDto, ['id']) {
  @IsNotEmpty({ message: 'Name is required and should not be null' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsNotEmpty({ message: 'Year is required and should not be null' })
  @IsNumber({}, { message: 'Year should be a number (amount of seconds)' })
  year: number;

  @IsOptional({ message: 'Optional' })
  @IsString({ message: 'ArtistId should be a string' })
  artistId: string | null;
}

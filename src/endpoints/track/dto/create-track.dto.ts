import { OmitType } from '@nestjs/mapped-types';
import { TrackDto } from './track.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto extends OmitType(TrackDto, ['id']) {
  @IsNotEmpty({ message: 'Name is required and should not be null' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsOptional({ message: 'Optional' })
  @IsString({ message: 'ArtistId should be a string' })
  artistId: string | null;

  @IsOptional({ message: 'Optional' })
  @IsString({ message: 'AlbumId should be a string' })
  albumId: string | null;

  @IsNotEmpty({ message: 'Duration is required and should not be null' })
  @IsNumber({}, { message: 'Duration should be a number (amount of seconds)' })
  duration: number;
}

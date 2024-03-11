import { OmitType } from '@nestjs/mapped-types';
import { AlbumDto } from './album.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto extends OmitType(AlbumDto, ['id']) {
  @IsNotEmpty({ message: '<<name>> is required and should not be null' })
  @IsString({ message: '<<name>> should be a string' })
  name: string;

  @IsNotEmpty({ message: '<<year>> is required and should not be null' })
  @IsNumber({}, { message: '<<year>> should be a number (amount of seconds)' })
  year: number;

  @IsOptional({ message: 'Optional' })
  @IsString({ message: '<<artistId>> should be a string' })
  artistId: string | null;
}

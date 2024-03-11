import { OmitType } from '@nestjs/mapped-types';
import { TrackDto } from './track.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto extends OmitType(TrackDto, ['id']) {
  @IsNotEmpty({ message: '<<name>> is required and should not be null' })
  @IsString({ message: '<<name>> should be a string' })
  name: string;

  @IsOptional({ message: 'Optional' })
  @IsUUID('4', { message: '<<artistId>> must be a valid UUID version 4' })
  artistId: string | null;

  @IsOptional({ message: 'Optional' })
  @IsUUID('4', { message: '<<albumId>> must be a valid UUID version 4' })
  albumId: string | null;

  @IsNotEmpty({ message: '<<duration>> is required and should not be null' })
  @IsNumber(
    {},
    { message: '<<duration>> should be a number (amount of seconds)' }
  )
  duration: number;
}

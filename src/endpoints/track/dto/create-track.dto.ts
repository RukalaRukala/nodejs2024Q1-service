import { PartialType } from '@nestjs/mapped-types';
import { TrackDto } from './track.dto';

export class CreateTrackDto extends PartialType(TrackDto) {}

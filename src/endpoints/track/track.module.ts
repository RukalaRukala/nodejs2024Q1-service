import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ValidateService } from '../../validate/validate.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, ValidateService],
})
export class TrackModule {}

import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateService } from '../../validate/validate.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ValidateService],
})
export class ArtistModule {}

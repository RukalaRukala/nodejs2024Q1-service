import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ValidateService } from '../../validate/validate.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, ValidateService],
})
export class AlbumModule {}

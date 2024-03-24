import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ValidateService } from '../../validate/validate.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, ValidateService],
})
export class FavoritesModule {}

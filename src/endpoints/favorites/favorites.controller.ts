import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post(':type/:id')
  async create(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) favId: string
  ) {
    await this.favoritesService.addFavorite(favId, type);
  }

  @Delete(':type/:id')
  async remove(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) favId: string
  ) {
    await this.favoritesService.removeFavorite(favId, type);
  }
}

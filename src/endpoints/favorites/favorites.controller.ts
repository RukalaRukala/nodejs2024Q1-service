import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { db } from '../../dataBase/db';
import { ValidateService } from '../../validate/validate.service';
import { UnprocessableEntityException } from './exceptions/unprocessable-entity-exception';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private validateService: ValidateService
  ) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':type/:id')
  create(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) favId: string
  ) {
    const dbField = `${type}s`;
    if (!this.validateService.doesIdExists(favId, db[dbField])) {
      throw new UnprocessableEntityException(
        `${type} with this id doesn't exist`
      );
    }
    this.favoritesService.addFavorite(favId, dbField);
  }

  @Delete(':type/:id')
  remove(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) favId: string
  ) {
    const dbField = `${type}s`;
    if (!this.validateService.doesIdExists(favId, db[dbField])) {
      throw new NotFoundException(`${type} with this id doesn't exist`);
    }
    this.favoritesService.removeFavorite(favId, dbField);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}

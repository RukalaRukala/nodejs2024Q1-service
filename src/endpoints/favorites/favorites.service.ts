import { Injectable } from '@nestjs/common';
import { db } from '../../dataBase/db';

@Injectable()
export class FavoritesService {
  findAll() {
    return db.favorites;
  }

  addFavorite(favId: string, dbField: string) {
    const chosenFav = db[dbField].find(fav => fav.id === favId);
    db.favorites[dbField].push(chosenFav);
  }

  removeFavorite(favId: string, dbField: string) {
    db.favorites[dbField] = db.favorites[dbField].filter(
      fav => fav.id !== favId
    );
  }
}

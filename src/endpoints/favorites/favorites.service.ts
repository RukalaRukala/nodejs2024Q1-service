import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {prisma} from "../../../prisma/seed";
import {UnprocessableEntityException} from "./exceptions/unprocessable-entity-exception";
import {IFavorites} from "../../dataBase/dataBase.model";

@Injectable()
export class FavoritesService {
  async findAll() {
    try {
      return await this.getFavorites();
    } catch (err) {
      throw err;
    }
  }

  async addFavorite(favId: string, type: string) {
    try {
      await this.checkIdsExistence(favId, type);

      const favoritesId = (await prisma.favorites.findFirst()).id;
      await prisma[type].update({
        where: {id: favId},
        data: {favoritesId: favoritesId}
      });
    } catch (err) {
      throw err;
    }
  }

  async removeFavorite(favId: string, type: string) {
    try {
      await this.checkIdsExistence(favId, type);

      await prisma[type].update({
        where: {id: favId},
        data: {favoritesId: null}
      });
    } catch (err) {
      throw err;
    }
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }

  async checkIdsExistence(id: string, type: string) {
    const chosenItem = await prisma[type].findUnique({where: {id}});
    if (!chosenItem) {
      throw new UnprocessableEntityException(
          `${type} with this id doesn't exist`
      );
    }
  }

  async getFavorites() {
    return (await prisma.favorites.findFirst({
      include: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true
          }
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true
          }
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          }
        }
      }
    }) as IFavorites);
  }
}

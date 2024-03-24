import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { db } from '../../dataBase/db';
import { v4 as uuidv4 } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  create(createAlbum: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId || null,
    } as AlbumDto;

    db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return db.albums;
  }

  findOne(id: string) {
    return db.albums.find(album => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const chosenAlbum = db.albums.find(album => album.id === id);
    return {
      id: chosenAlbum.id,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId || chosenAlbum.artistId,
    } as UpdateAlbumDto;
  }

  remove(id: string) {
    db.albums = db.albums.filter(album => album.id !== id);
    db.favorites.albums = db.favorites.albums.filter(album => album.id !== id);

    db.tracks = db.tracks.map(track => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
  }
}

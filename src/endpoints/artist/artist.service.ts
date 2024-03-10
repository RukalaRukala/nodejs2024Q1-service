import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { db } from '../../dataBase/db';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  create(createArtist: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      name: createArtist.name,
      grammy: createArtist.grammy,
    } as ArtistDto;

    db.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return db.artists;
  }

  findOne(id: string) {
    return db.artists.find(artist => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const chosenArtist = db.artists.find(artist => artist.id === id);
    return {
      id: chosenArtist.id,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    } as UpdateArtistDto;
  }

  remove(id: string) {
    db.artists = db.artists.filter(artist => artist.id !== id);
    db.tracks = db.tracks.map(track => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });

    db.album = db.album.map(album => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
  }
}

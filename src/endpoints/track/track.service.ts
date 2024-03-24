import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from '../../dataBase/db';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    } as TrackDto;

    db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return db.tracks;
  }

  findOne(id: string) {
    return db.tracks.find(user => user.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const chosenTrack = db.tracks.find(user => user.id === id);
    return {
      id: chosenTrack.id,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId || chosenTrack.artistId,
      albumId: updateTrackDto.albumId || chosenTrack.albumId,
      duration: updateTrackDto.duration,
    } as UpdateTrackDto;
  }

  remove(id: string) {
    db.tracks = db.tracks.filter(track => track.id !== id);
    db.favorites.tracks = db.favorites.tracks.filter(track => track.id !== id);
  }
}

import {ConflictException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import {prisma} from "../../../prisma/seed";
import {IAlbum, IArtist, ITrack} from "../../dataBase/dataBase.model";

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    await this.checkArtist(createTrackDto);
    await this.checkAlbum(createTrackDto);
    try {
      return await prisma.track.create({
        data: {
          id: uuidv4(),
          name: createTrackDto.name,
          artistId: createTrackDto.artistId || null,
          albumId: createTrackDto.albumId || null,
          duration: createTrackDto.duration,
        } as TrackDto,
      })
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await prisma.track.findMany();
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    await this.checkIdsExistence(id);
    try {
      return await prisma.track.findUnique({where: {id}});
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.checkArtist(updateTrackDto);
    await this.checkAlbum(updateTrackDto);
    try {
      const chosenTrack: ITrack = await prisma.track.findUnique({where: {id}});
      await this.checkIdsExistence(id);
      return await prisma.track.update({
        where: {id},
        data: {
          id: chosenTrack.id,
          name: updateTrackDto.name,
          artistId: updateTrackDto.artistId || chosenTrack.artistId,
          albumId: updateTrackDto.albumId || chosenTrack.albumId,
          duration: updateTrackDto.duration,
        } as UpdateTrackDto,
      })
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      await this.checkIdsExistence(id);
      await prisma.track.delete({where: {id}});
    } catch (err) {
      throw err;
    }
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }

  async checkIdsExistence(id: string) {
    const chosenTrack = await prisma.track.findUnique({where: {id}});
    if (!chosenTrack) {
      throw new NotFoundException("A track with that id doesn't exist");
    }
  }

  async checkArtist(dto: CreateTrackDto | UpdateTrackDto) {
    if (dto.artistId) {
      const artist: IArtist = await prisma.artist.findUnique({where: {id: dto.artistId}});
      if (!artist) {
        throw new ConflictException("An artist with that id doesn't exist");
      }

      const tracksWithTheSameName: ITrack[] = await prisma.track.findMany({where: {name: dto.name}});
      if (tracksWithTheSameName[0]) {
        for (const track of tracksWithTheSameName) {
          if (track.artistId === dto.artistId) {
            throw new ConflictException("A track with the same name and artist id already exists");
          }
        }
      }
    }
  }

  async checkAlbum(dto: CreateTrackDto | UpdateTrackDto) {
    if (dto.albumId) {
      const trackAlbum: IAlbum = await prisma.album.findUnique({where: {id: dto.albumId}});

      if (!trackAlbum) {
        throw new ConflictException("An album with that id doesn't exist");
      }

      if (dto.artistId && dto.artistId !== trackAlbum.artistId) {
        throw new ConflictException("An album is not related with artist");
      }
    }
  }
}

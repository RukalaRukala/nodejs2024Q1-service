import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from '../../dataBase/dataBase.model';
import { db } from '../../dataBase/db';

@Injectable()
export class ArtistsService {
  private readonly artists: IArtist[];

  constructor() {
    this.artists = db.artists;
  }
  create(createArtistDto: CreateArtistDto) {
    return 'This action adds a new artist';
  }

  findAll() {
    return this.artists;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}

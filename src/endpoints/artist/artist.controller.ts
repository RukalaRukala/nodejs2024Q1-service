import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { db } from '../../dataBase/db';
import { ValidateService } from '../../validate/validate.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private validateService: ValidateService
  ) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.artists)) {
      throw new NotFoundException("Artist with this id doesn't exist");
    }
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto
  ) {
    if (!this.validateService.doesIdExists(id, db.artists)) {
      throw new NotFoundException("Artist with this id doesn't exist");
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.artists)) {
      throw new NotFoundException("Artist with this id doesn't exist");
    }
    this.artistService.remove(id);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}

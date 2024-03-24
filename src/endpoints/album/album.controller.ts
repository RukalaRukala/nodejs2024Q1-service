import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ValidateService } from '../../validate/validate.service';
import { db } from '../../dataBase/db';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private validateService: ValidateService
  ) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.albums)) {
      throw new NotFoundException("Album with this id doesn't exist");
    }
    return this.albumService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto
  ) {
    if (!this.validateService.doesIdExists(id, db.albums)) {
      throw new NotFoundException("Album with this id doesn't exist");
    }
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.albums)) {
      throw new NotFoundException("Album with this id doesn't exist");
    }
    this.albumService.remove(id);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}

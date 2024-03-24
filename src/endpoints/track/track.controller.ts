import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidateService } from '../../validate/validate.service';
import { db } from '../../dataBase/db';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private validateService: ValidateService
  ) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.tracks)) {
      throw new NotFoundException("Track with this id doesn't exist");
    }
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto
  ) {
    if (!this.validateService.doesIdExists(id, db.tracks)) {
      throw new NotFoundException("Track with this id doesn't exist");
    }
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.tracks)) {
      throw new NotFoundException("Track with this id doesn't exist");
    }
    this.trackService.remove(id);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}

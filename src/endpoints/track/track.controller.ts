import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ValidateService } from '../../validate/validate.service';
import { isUUID } from 'class-validator';
import { db } from '../../dataBase/db';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private validateService: ValidateService
  ) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    const props = ['name', 'duration'];
    if (!this.validateService.isRequiredFields(createTrackDto, props)) {
      throw new BadRequestException('Wrong required fields (name, duration)');
    }
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (!this.validateService.doesIdExists(id, db.tracks)) {
      throw new NotFoundException("Track with this id doesn't exist");
    }
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const props = ['name', 'duration'];
    if (!this.validateService.isRequiredFields(updateTrackDto, props)) {
      throw new BadRequestException('Wrong required fields (name, duration)');
    }
    if (!isUUID(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (!this.validateService.doesIdExists(id, db.tracks)) {
      throw new NotFoundException("Track with this id doesn't exist");
    }
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('ID is not a valid UUID');
    }
    if (!this.validateService.doesIdExists(id, db.tracks)) {
      throw new NotFoundException("Track with this id doesn't exist");
    }
    this.trackService.remove(id);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseUUIDPipe,
    Put,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {AlbumService} from './album.service';
import {CreateAlbumDto} from './dto/create-album.dto';
import {UpdateAlbumDto} from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto) {
        return this.albumService.create(createAlbumDto);
    }

    @Get()
    findAll() {
        return this.albumService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        return this.albumService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', new ParseUUIDPipe({version: '4'})) id: string,
        @Body() updateAlbumDto: UpdateAlbumDto
    ) {
        return this.albumService.update(id, updateAlbumDto);
    }

    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        this.albumService.remove(id);
        throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }
}

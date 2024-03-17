import {ConflictException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateAlbumDto} from './dto/create-album.dto';
import {v4 as uuidv4} from 'uuid';
import {AlbumDto} from './dto/album.dto';
import {UpdateAlbumDto} from './dto/update-album.dto';
import {prisma} from "../../../prisma/seed";

@Injectable()
export class AlbumService {
    async create(createAlbum: CreateAlbumDto) {
        await this.checkArtist(createAlbum);
        try {
            return await prisma.album.create({
                data: {
                    id: uuidv4(),
                    name: createAlbum.name,
                    year: createAlbum.year,
                    artistId: createAlbum.artistId || null,
                } as AlbumDto
            });
        } catch (err) {
            throw err;
        }
    }

    async findAll() {
        try {
            return await prisma.album.findMany();
        } catch (err) {
            throw err;
        }
    }

    async findOne(id: string) {
        try {
            await this.checkIdsExistence(id);
            return await prisma.album.findUnique({where: {id}});
        } catch (err) {
            throw err;
        }
    }

    async update(id: string, updateAlbumDto: UpdateAlbumDto) {
        await this.checkArtist(updateAlbumDto);
        try {
            const chosenAlbum = await prisma.album.findUnique({where: {id}});
            await this.checkIdsExistence(id);
            return await prisma.album.update({
                where: {id},
                data: {
                    id: chosenAlbum.id,
                    name: updateAlbumDto.name,
                    year: updateAlbumDto.year,
                    artistId: updateAlbumDto.artistId || chosenAlbum.artistId,
                } as UpdateAlbumDto,
            });
        } catch (err) {
            throw err;
        }
    }

    async remove(id: string) {
        try {
            await this.checkIdsExistence(id);
            await prisma.album.delete({where: {id}});
            // db.favorites.albums = db.favorites.albums.filter(album => album.id !== id);
            //
            // db.tracks = db.tracks.map(track => {
            //     if (track.albumId === id) {
            //         track.albumId = null;
            //     }
            //     return track;
            // });
        } catch (err) {
            console.log('привет')
            throw err;
        }
        throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }

    async checkIdsExistence(id: string) {
        const chosenAlbum = await prisma.album.findUnique({where: {id}});
        if (!chosenAlbum) {
            throw new NotFoundException("An album with that id doesn't exist");
        }
    }

    async checkArtist(dto: CreateAlbumDto | UpdateAlbumDto) {
        if (dto.artistId && !(await prisma.artist.findUnique({where: {id: dto.artistId}}))) {
            throw new ConflictException("An artist with that id doesn't exist");
        }
    }
}

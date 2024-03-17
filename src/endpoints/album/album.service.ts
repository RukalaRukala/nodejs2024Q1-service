import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateAlbumDto} from './dto/create-album.dto';
import {v4 as uuidv4} from 'uuid';
import {AlbumDto} from './dto/album.dto';
import {UpdateAlbumDto} from './dto/update-album.dto';
import {prisma} from "../../../prisma/seed";

@Injectable()
export class AlbumService {
    async create(createAlbum: CreateAlbumDto) {
        try {
            if (createAlbum.artistId && !(await prisma.artist.findUnique({where: {id: createAlbum.artistId}}))) {
                throw new ConflictException("An artist with that id doesn't exist");
            }
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
            return await prisma.artist.findMany();
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
        try {
            if (updateAlbumDto.artistId && !(await prisma.artist.findUnique({where: {id: updateAlbumDto.artistId}}))) {
                throw new ConflictException("An artist with that id doesn't exist");
            }
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
            throw err;
        }

    }

    async checkIdsExistence(id: string) {
        const chosenAlbum = await prisma.album.findUnique({where: {id}});
        if (!chosenAlbum) {
            throw new NotFoundException("Album with that id doesn't exist");
        }
    }
}

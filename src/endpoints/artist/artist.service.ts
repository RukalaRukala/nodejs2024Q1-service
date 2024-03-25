import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateArtistDto} from './dto/create-artist.dto';
import {v4 as uuidv4} from 'uuid';
import {ArtistDto} from './dto/artist.dto';
import {UpdateArtistDto} from './dto/update-artist.dto';
import {prisma} from "../../../prisma/seed";

@Injectable()
export class ArtistService {
    async create(createArtist: CreateArtistDto) {
        try {
            return await prisma.artist.create({
                data: {
                    id: uuidv4(),
                    name: createArtist.name,
                    grammy: createArtist.grammy,
                } as ArtistDto
            });
        } catch (err) {
            throw err;
        }
    }

    findAll() {
        return prisma.artist.findMany();
    }

    async findOne(id: string) {
        try {
            await this.checkIdsExistence(id);
            return await prisma.artist.findUnique({where: {id}});
        } catch (err) {
            throw err;
        }
    }

    async update(id: string, updateArtistDto: UpdateArtistDto) {
        try {
            const chosenArtist = await prisma.artist.findUnique({where: {id}});
            await this.checkIdsExistence(id);
            return await prisma.artist.update({
                where: {id},
                data: {
                    id: chosenArtist.id,
                    name: updateArtistDto.name,
                    grammy: updateArtistDto.grammy,
                } as UpdateArtistDto,
            });
        } catch (err) {
            throw err;
        }
    }

    async remove(id: string) {
        try {
            await this.checkIdsExistence(id);
            await prisma.artist.delete({where: {id}});
        } catch (err) {
            throw err;
        }
        throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }

    async checkIdsExistence(id: string) {
        const chosenArtist = await prisma.artist.findUnique({where: {id}});
        if (!chosenArtist) {
            throw new NotFoundException("Artist with that id doesn't exist");
        }
    }
}

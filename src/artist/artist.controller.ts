import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {ArtistService} from "./artist.service";
import {CreateArtistDto} from "./dto/create-artist.dto";
import {ObjectId} from "mongoose";
import {UpdateArtistDto} from "./dto/update-artist.dto";


@Controller('/artist')
export class ArtistController {

    constructor(private artistService: ArtistService) {}

    @Post()
    create(@Body() dto: CreateArtistDto) {
        console.log(dto)
        return this.artistService.create(dto)
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.artistService.getAll(count, offset)
    }

    @Get('search')
    search(@Query('query') query: string) {
        return this.artistService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.artistService.getOne(id)
    }


    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.artistService.delete(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
        return this.artistService.update(id, dto)
    }

}
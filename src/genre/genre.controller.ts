import {ObjectId} from "mongoose";
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors} from "@nestjs/common";
import {GenreService} from "./genre.service";
import {UpdateAlbumDto} from "../album/dto/update-album.dto";


@Controller("/genre")
export class GenreController {

    constructor(private genreService: GenreService) {
    }

    @UseInterceptors(AnyFilesInterceptor())
    @Post()
    create(@Body() dto) {
        console.log(dto);
        return this.genreService.create(dto);
    }


    @Get()
    getAll(@Query("count") count: number = 10,
           @Query("offset") offset: number = 0,
           @Query("q") q: string
    ) {
        return this.genreService.getAll(q, count, offset);
    }

    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.genreService.getOne(id);
    }


    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.genreService.delete(id);
    }

    @Put(":id")
    update(@Param("id") id: string,
           @Body() dto: UpdateAlbumDto) {
        return this.genreService.update(id, dto);
    }

}
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors
} from "@nestjs/common";
import {GenreService} from "./genre.service";
import {UpdateAlbumDto} from "../album/dto/update-album.dto";


@Controller("/genre")
export class GenreController {

    constructor(private genreService: GenreService) {
    }

    @UseInterceptors(AnyFilesInterceptor())
    @Post()
    create(@Body() dto) {
        return this.genreService.create(dto);
    }

    @Get()
    getAll() {
        return this.genreService.getAll();
    }

    @Delete(":name")
    delete(@Param("name") name: string) {
        return this.genreService.delete(name);
    }

    @Put(":id")
    update(@Param("id") id: string,
           @Body() dto: UpdateAlbumDto) {
        return this.genreService.update(id, dto);
    }

}
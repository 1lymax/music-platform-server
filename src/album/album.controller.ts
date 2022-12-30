import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {ObjectId} from "mongoose";
import {UpdateAlbumDto} from "./dto/update-album.dto";


@Controller('/album')
export class AlbumController {

    constructor(private albumService: AlbumService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        return this.albumService.create(dto, files.picture[0])
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset)
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.albumService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }


    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
        return this.albumService.update(id, dto)
    }

}
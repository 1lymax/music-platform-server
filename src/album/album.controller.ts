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
        return this.albumService.create(
            dto,
            files.picture.length ? files.picture[0]: null
        )
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset)
    }

    @Get('/search')
    search(@Query() query: string) {
        return this.albumService.search(query)
    }

    @Get('/search/artist')
    filterByArtist(@Query() query: string) {
        return this.albumService.filterByArtist(query)
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
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))
    update(@UploadedFiles() files,
           @Param('id') id: string,
           @Body() dto: UpdateAlbumDto) {
        const picture = files?.picture?.length ? files.picture[0] : ''
        return this.albumService.update(id, dto, picture)
    }

    @Delete('/picture/:id')
    deletePicture(@Param('id') id: string) {
        return this.albumService.deletePicture(id)
    }

}
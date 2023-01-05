import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {ObjectId} from "mongoose";
import {CreateCommentDto} from "../comments/dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {UpdateAlbumDto} from "../album/dto/update-album.dto";


@Controller('/track')
export class TrackController {

    constructor(private trackService: TrackService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const {picture, audio} = files
        return this.trackService.create(
            dto,
            picture?.length ? picture[0] : null,
            audio?.length ? audio[0]: null
        )
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset)
    }

    @Get('search')
    search(@Query('query') query: string) {
        return this.trackService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }


    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id)
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto)
    }

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId){
        return this.trackService.listen(id)
    }

    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1}
    ]))
    update(@UploadedFiles() files,
           @Param('id') id: string,
           @Body() dto: UpdateAlbumDto) {
        const picture = files?.picture?.length ? files.picture[0] : ''
        const audio = files?.audio?.length ? files.audio[0] : ''
        return this.trackService.update(id, dto, picture, audio)
    }


    @Delete('/picture/:id')
    deletePicture(@Param('id') id: string) {
        return this.trackService.deletePicture(id)
    }
}
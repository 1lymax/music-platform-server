import {ObjectId} from "mongoose";
import {AnyFilesInterceptor, FileFieldsInterceptor} from "@nestjs/platform-express";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {TrackService} from "./track.service";
import {UpdateAlbumDto} from "../album/dto/update-album.dto";
import {CreateCommentDto} from "../comments/dto/create-comment.dto";


@Controller("/track")
export class TrackController {

    constructor(private trackService: TrackService) {
    }

    @Post()
    @UseInterceptors(AnyFilesInterceptor())
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'picture', maxCount: 1 },
    //     { name: 'audio[0].file', maxCount: 1 },
    //     { name: 'audio[1].file', maxCount: 1 }
    // ]))
    //create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    create(@UploadedFiles() files, @Body() dto) {
        let filesArray = [];
        let dtoArray = [];
        for (const file of files) {
            const [index, key] = file.fieldname.split(".");
            filesArray[index] = { ...filesArray[index], [key]: file };
        }
        console.log(filesArray);
        for (const [dtoItem, value] of Object.entries(dto)) {
            const [index, key] = dtoItem.split(".");
            dtoArray[index] = { ...dtoArray[index], [key]: value };
        }
        console.log(dtoArray);
        let createdTracks = [];
        for (let i = 0; i < filesArray.length; i++) {
            if (filesArray[i].audio)
                createdTracks.push(this.trackService.create(
                    dtoArray[i],
                    filesArray[i].picture? filesArray[i].picture: '',
                    filesArray[i].audio
                ));
        }
        return createdTracks;
    }

    @Get()
    getAll(@Query("count") count: number = 10,
           @Query("offset") offset: number = 0,
           @Query("q") q: string
    ) {
        return this.trackService.getAll(q, count, offset);
    }

    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.trackService.getOne(id);
    }


    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.trackService.delete(id);
    }

    @Post("/comment")
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }

    @Post("/listen/:id")
    listen(@Param("id") id: ObjectId) {
        return this.trackService.listen(id);
    }

    @Put(":id")
    @UseInterceptors(FileFieldsInterceptor([
        { name: "picture", maxCount: 1 },
        { name: "audio", maxCount: 1 }
    ]))
    update(@UploadedFiles() files,
           @Param("id") id: string,
           @Body() dto: UpdateAlbumDto) {
        const picture = files?.picture?.length ? files.picture[0] : "";
        const audio = files?.audio?.length ? files.audio[0] : "";
        return this.trackService.update(id, dto, picture, audio);
    }


    @Delete("/picture/:id")
    deletePicture(@Param("id") id: string) {
        return this.trackService.deletePicture(id);
    }
}
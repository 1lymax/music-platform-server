import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Request,
    UnauthorizedException,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

import {PlaylistService} from "./playlist.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreatePlaylistDto} from "./dto/create-playlist.dto";
import {UpdatePlaylistDto} from "./dto/update-playlist.dto";
import {CaslAbilityFactory} from "../casl/casl-ability.factory/casl-ability.factory";


@Controller('/playlist')
@UseGuards(JwtAuthGuard)
export class PlaylistController {

    constructor(private playlistService: PlaylistService,
                private caslAbilityFactory: CaslAbilityFactory,
    ) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreatePlaylistDto, @Request() req) {
        return this.playlistService.create(
            dto,
            files?.picture?.length ? files.picture[0] : null,
            req.user
        )
    }

    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    async update(@UploadedFiles() files,
                 @Param('id') id: string,
                 @Body() dto: UpdatePlaylistDto,
                 @Request() req) {
        const picture = files?.picture?.length ? files.picture[0] : ''
        const ability = this.caslAbilityFactory.createForUser(req.user)
        const updatedPlaylist = await this.playlistService.update(id, dto, picture, ability)
        if (!updatedPlaylist)
            throw new UnauthorizedException()
        return updatedPlaylist
    }

    @Get(':id')
    async getOne(@Param('id') id: ObjectId, @Request() req) {
        const ability = this.caslAbilityFactory.createForUser(req.user)
        const playlist = await this.playlistService.getOne(id, ability)
        if (!playlist)
            throw new UnauthorizedException()
        return playlist
    }

    @Get()
    async getPublicPlaylists(@Query('q') q: string = '',
                             @Query('count') count: number = 10,
                             @Query('offset') offset: number = 0) {
        const playlists = await this.playlistService.getPublicPlaylists(q, count, offset)
        return playlists
    }

    @Get('/user/:id')
    async getUserPlaylists(@Query('q') q: string = '',
                           @Query('count') count: number = 10,
                           @Query('offset') offset: number = 0,
                           @Param('id') id: ObjectId,
                           @Request() req) {
        const ability = this.caslAbilityFactory.createForUser(req.user)
        const playlists = await this.playlistService.getUserPlaylists(q, count, offset, id, ability)
        if (!playlists.length)
            throw new NotFoundException()
        return playlists
    }

    @Delete(':id')
    async delete(@Param('id') id: ObjectId, @Request() req) {
        const ability = this.caslAbilityFactory.createForUser(req.user)
        const deletedPlaylist = await this.playlistService.delete(id, ability)
        if (!deletedPlaylist)
            throw new NotFoundException()
        return deletedPlaylist
    }

    @Post(':id/track/:track')
    async addTrack(
        @Param('id') id: ObjectId,
        @Param('track') trackId: ObjectId,
        @Request() req
    ) {
        const ability = this.caslAbilityFactory.createForUser(req.user)
        const playlist = await this.playlistService.addTrack(id, trackId, ability)
        if (!playlist)
            throw new UnauthorizedException()
        return playlist
    }

    @Delete(':id/track/:track')
    async removeTrack(
        @Param('id') id: ObjectId,
        @Param('track') trackId: ObjectId,
        @Request() req
    ) {
        const ability = this.caslAbilityFactory.createForUser(req.user)
        const playlist = await this.playlistService.removeTrack(id, trackId, ability)
        if (!playlist)
            throw new UnauthorizedException()
        return playlist
    }

    @Delete('/picture/:id')
    async deletePicture(@Param('id') id: string, @Request() req) {
        const ability = this.caslAbilityFactory.createForUser(req.user)
        const playlist = await this.playlistService.deletePicture(id, ability)
        if (!playlist)
            throw new UnauthorizedException()
        return playlist
    }


    //
    // @Delete(':id')
    // delete(@Param('id') id: ObjectId) {
    //     return this.playlistService.delete(id)
    // }


    //
    // @Get()
    // getAll(@Query('count') count: number,
    //        @Query('offset') offset: number) {
    //     return this.playlistService.getAll(count, offset)
    // }
    //
    // @Get('/search')
    // search(@Query() query: string) {
    //     return this.playlistService.search(query)
    // }
    //
    // @Get('/search/artist')
    // filterByArtist(@Query() query: string) {
    //     return this.playlistService.filterByArtist(query)
    // }
    //
    // @Get(':id')
    // getOne(@Param('id') id: ObjectId) {
    //     return this.playlistService.getOne(id)
    // }
    //
    // @Delete(':id')
    // delete(@Param('id') id: ObjectId) {
    //     return this.playlistService.delete(id)
    // }
    //

    //
    // @Delete('/picture/:id')
    // deletePicture(@Param('id') id: string) {
    //     return this.playlistService.deletePicture(id)
    // }

}
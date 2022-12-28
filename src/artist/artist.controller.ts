import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {ArtistService} from "./artist.service";
import {CreateArtistDto} from "./dto/create-artist.dto";


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

    // @Get(':id')
    // getOne(@Param('id') id: ObjectId) {
    //     return this.trackService.getOne(id)
    // }
    //
    //
    // @Delete(':id')
    // delete(@Param('id') id: ObjectId) {
    //     return this.trackService.delete(id)
    // }
    //
    // @Post('/comment')
    // addComment(@Body() dto: CreateCommentDto) {
    //     return this.trackService.addComment(dto)
    // }
    //
    // @Post('/listen/:id')
    // listen(@Param('id') id: ObjectId){
    //     return this.trackService.listen(id)
    // }
}
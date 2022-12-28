import {Controller} from "@nestjs/common";
import {ArtistService} from "./artist.service";


@Controller('/track')
export class ArtistController {

    constructor(private artistService: ArtistService) {}

    // @Post()
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'picture', maxCount: 1 },
    //     { name: 'audio', maxCount: 1 },
    // ]))
    // create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    //     const {picture, audio} = files
    //     return this.trackService.create(dto, picture[0], audio[0])
    // }
    //
    // @Get()
    // getAll(@Query('count') count: number,
    //        @Query('offset') offset: number) {
    //     return this.trackService.getAll(count, offset)
    // }
    //
    // @Get('search')
    // search(@Query('query') query: string) {
    //     return this.trackService.search(query)
    // }
    //
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
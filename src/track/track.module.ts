import {Module} from "@nestjs/common";
import {TrackController} from "./track.controller";
import {TrackService} from "./track.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "./track.schema";
import {Comment, CommentSchema} from "../comments/comment.schema";
import {FileService} from "../file/file.service";
import {Artist, ArtistSchema} from "../artist/artist.schema";
import {Album, AlbumSchema} from "../album/album.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
        MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService]
})

export class TrackModule {}
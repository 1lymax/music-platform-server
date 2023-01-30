import {Module} from "@nestjs/common";
import {PlaylistController} from "./playlist.controller";
import {PlaylistService} from "./playlist.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Playlist, PlaylistSchema} from "./playlist.schema";
import {FileService} from "../file/file.service";
import {Track, TrackSchema} from "../track/track.schema";
import {User, UserSchema} from "../users/user.schema";
import {CaslModule} from "../casl/casl.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Playlist.name, schema: PlaylistSchema}]),
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        CaslModule
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService, FileService, CaslModule]
})

export class PlaylistModule {}
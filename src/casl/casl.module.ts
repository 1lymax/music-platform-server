import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Playlist, PlaylistSchema} from "../playlist/playlist.schema";
import {CaslAbilityFactory} from "./casl-ability.factory/casl-ability.factory";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Playlist.name, schema: PlaylistSchema}]),
    ],
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule {}

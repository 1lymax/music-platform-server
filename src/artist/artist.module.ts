import {Module} from "@nestjs/common";
import {ArtistController} from "./artist.controller";
import {ArtistService} from "./artist.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Artist, ArtistSchema} from "./artist.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}]),
    ],
    controllers: [ArtistController],
    providers: [ArtistService]
})

export class ArtistModule {}
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {GenreService} from "./genre.service";
import {GenreController} from "./genre.controller";
import {Genre, GenreSchema} from "./genre.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Genre.name, schema: GenreSchema}]),
        // MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}]),
        // MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    ],
    controllers: [GenreController],
    providers: [GenreService]
})

export class GenreModule {}
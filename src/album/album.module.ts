import {Module} from "@nestjs/common";
import {AlbumController} from "./album.controller";
import {AlbumService} from "./album.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Album, AlbumSchema} from "./album.schema";
import {FileService} from "../file/file.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService]
})

export class AlbumModule {}
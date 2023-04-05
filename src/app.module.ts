import * as path from "path";
import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from './auth/auth.module';
import {FileModule} from "./file/file.module";
import {UserModule} from './users/user.module';
import {AppController} from "./app.controller";
import {MongooseModule} from "@nestjs/mongoose";
import { CaslModule } from './casl/casl.module';
import {TrackModule} from "./track/track.module";
import {AlbumModule} from "./album/album.module";
import {GenreModule} from "./genre/genre.module";
import {ArtistModule} from "./artist/artist.module";
import {AuthController} from "./auth/auth.controller";
import {ServeStaticModule} from "@nestjs/serve-static";
import {PlaylistModule} from "./playlist/playlist.module";

@Module( {
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),}),
        MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5etmffb.mongodb.net/?retryWrites=true&w=majority`),
        TrackModule,
        FileModule,
        ArtistModule,
        AlbumModule,
        AuthModule,
        UserModule,
        PlaylistModule,
        CaslModule,
        GenreModule
    ],
    controllers: [AppController, AuthController],
})
export class AppModule {}
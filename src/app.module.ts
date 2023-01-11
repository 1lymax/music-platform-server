import * as path from "path";
import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {FileModule} from "./file/file.module";
import {MongooseModule} from "@nestjs/mongoose";
import {TrackModule} from "./track/track.module";
import {AlbumModule} from "./album/album.module";
import {ArtistModule} from "./artist/artist.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import {AppController} from "./app.controller";

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
        UserModule
    ],
    controllers: [AppController]
})
export class AppModule {}
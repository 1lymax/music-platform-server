import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module( {
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),}),
        MongooseModule.forRoot('mongodb+srv://musicplatform:o7P25vBJKUYT2W0i@cluster0.5etmffb.mongodb.net/?retryWrites=true&w=majority'),
        TrackModule,
        FileModule,
    ]
})
export class AppModule {}
import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module( {
    imports: [
        MongooseModule.forRoot('mongodb+srv://musicplatform:o7P25vBJKUYT2W0i@cluster0.5etmffb.mongodb.net/?retryWrites=true&w=majority'),
        TrackModule
    ]
})
export class AppModule {}
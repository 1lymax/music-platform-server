import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from "mongoose";
import {Artist} from "../artist/artist.schema";
import {Track} from "../track/track.schema";

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop()
    year: number;

    @Prop()
    picture: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Artist'})
    artist: Artist;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[];


}

export const AlbumSchema = SchemaFactory.createForClass(Album);
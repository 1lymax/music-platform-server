import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import {Track} from "../track/track.schema";
import {Album} from "../album/album.schema";

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist {
    @Prop()
    name: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]})
    albums: Album[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
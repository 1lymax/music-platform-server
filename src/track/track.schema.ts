import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Comment} from "../comments/comment.schema";
import * as mongoose from 'mongoose';
import {Artist} from "../artist/artist.schema";
import {Album} from "../album/album.schema";


export type TrackDocument = mongoose.HydratedDocument<Track>;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Artist'})
    artist: Artist;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Album'})
    album: Album;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop()
    duration: number;

    @Prop()
    genre: string[];

    @Prop()
    label: string[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Comment} from "./comment.schema";
import * as mongoose from 'mongoose';


export type TrackDocument = mongoose.HydratedDocument<Track>;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: number;

    @Prop()
    audio: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment'})
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
import * as mongoose from 'mongoose';
import {HydratedDocument} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {AccessibleModel, accessibleRecordsPlugin} from "@casl/mongoose";
import {User} from "../users/user.schema";
import {Track} from "../track/track.schema";

export type PlaylistDocument = Playlist & Document & HydratedDocument<Playlist>;

@Schema({timestamps: true})
export class Playlist {
    @Prop({required: true})
    name: string;

    @Prop()
    picture: string;

    @Prop()
    public: boolean;

    @Prop()
    saved: boolean;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    user: User;
}

export const PlaylistSchema = SchemaFactory.createForClass<
    Playlist,
    AccessibleModel<Playlist>
    >(Playlist).plugin(accessibleRecordsPlugin);

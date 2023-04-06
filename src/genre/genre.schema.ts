import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose from "mongoose";


export type GenreDocument = mongoose.HydratedDocument<Genre>;

@Schema()
export class Genre {
    @Prop()
    name: string[];

    // @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}]})
    // artists: Artist[];
    //
    // @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]})
    // albums: Artist[];
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
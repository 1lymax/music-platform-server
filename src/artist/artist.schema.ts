import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist {
    @Prop()
    name: string;

    @Prop()
    tracks: string;

    @Prop()
    albums: string;


}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
import {ObjectId} from "mongoose";

export class UpdateTrackDto {
    readonly name: string;
    readonly text: string;
    readonly artist: ObjectId;
    readonly album: ObjectId;
}
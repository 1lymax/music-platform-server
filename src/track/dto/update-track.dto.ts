import {ObjectId} from "mongoose";

export class UpdateTrackDto {
    readonly name: string;
    readonly text: string;
    readonly artistId: ObjectId;
    readonly albumId: ObjectId;
}
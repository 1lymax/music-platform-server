import {ObjectId} from "mongoose";

export class CreateTrackDto {
    readonly name: string;
    readonly text: string;
    readonly artistId: ObjectId;
    readonly albumId: ObjectId;
}
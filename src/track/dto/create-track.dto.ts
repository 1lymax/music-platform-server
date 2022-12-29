import {ObjectId} from "mongoose";

export class CreateTrackDto {
    readonly name;
    readonly text;
    readonly artistId: ObjectId;
    readonly albumId: ObjectId;
}
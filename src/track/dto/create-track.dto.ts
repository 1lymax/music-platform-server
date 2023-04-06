import {ObjectId} from "mongoose";

export class CreateTrackDto {
    readonly name: string;
    readonly text: string;
    readonly audio: File;
    readonly picture: File;
    readonly artist: ObjectId;
    readonly album: ObjectId;
    readonly duration: number;
    readonly genre: ObjectId[];
    readonly label: string[];
    readonly posInAlbum: number
    readonly year: number
}

export class CreateMultipleTrackDto {
    tracks: CreateTrackDto[]
}
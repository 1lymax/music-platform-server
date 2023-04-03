import {ObjectId} from "mongoose";

export class CreateTrackDto {
    readonly name: string;
    readonly text: string;
    readonly artist: ObjectId;
    readonly album: ObjectId;
    readonly duration: number;
    readonly genre: string[];
    readonly label: string[];
    readonly posInAlbum: number
    readonly year: number
}[]

export class CreateMultipleTrackDto {
    readonly name: string;
    readonly text: string;
    readonly artist: ObjectId;
    readonly album: ObjectId;
    readonly audio: string;
    readonly picture: string;
}
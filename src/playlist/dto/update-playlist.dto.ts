import {Track} from "../../track/track.schema";

export class UpdatePlaylistDto {
    readonly name: string;
    readonly picture: string;
    readonly public: boolean;
    readonly saved: boolean;
    readonly tracks: Track[];
}
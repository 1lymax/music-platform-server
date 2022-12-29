import {Track} from "../../track/track.schema";
import {Album} from "../../album/album.schema";

export class UpdateArtistDto {
    readonly name: string;
    readonly tracks: Track[];
    readonly albums: Album[];


}
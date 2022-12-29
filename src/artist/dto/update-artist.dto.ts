import {Track} from "../../track/track.schema";
import {Album} from "../../album/album.schema";

export class UpdateArtistDto {
    readonly name;
    readonly tracks: Track[];
    readonly albums: Album[];


}
import {Artist} from "../../artist/artist.schema";
import {Track} from "../../track/track.schema";

export class UpdateAlbumDto {
    readonly name: string;
    readonly year: number;
    readonly picture: string;
    readonly artistId: Artist;
    readonly tracks: Track[];
}
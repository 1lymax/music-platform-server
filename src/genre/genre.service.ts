import {Model} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Genre, GenreDocument} from "./genre.schema";
import {CreateGenreDto} from "./dto/create-genre.dto";


@Injectable()
export class GenreService {
    documentId = "642d1d29773ed537572471e6";

    constructor(
        @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
        // @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        // @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
        // @InjectModel(Album.name) private albumModel: Model<AlbumDocument>
    ) {
    }

    async create(dto: CreateGenreDto) {
        const dtoArray = dto.name.split(",");
        let document;
        if (true)
            document = await this.genreModel.findByIdAndUpdate(this.documentId, {
                $addToSet: {
                    name: { $each: dtoArray }
                }
            }, { new: true });
        return document;
    }

    async getAll(): Promise<Genre['name']> {
        const genre = await this.genreModel.findById(this.documentId)
        return genre.name;
    }

    async delete(name: string): Promise<Genre> {
        const updatedGenre = await this.genreModel.findByIdAndUpdate(this.documentId,{
            $pull : { name }
        });
        return updatedGenre;
    }

    // TODO
    async update(id, dto) {
        const genre = await this.genreModel.findByIdAndUpdate(id, dto, { new: true });
        return genre;
    }
}
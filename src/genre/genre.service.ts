import {Model, ObjectId} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Genre, GenreDocument} from "./genre.schema";
import {CreateGenreDto} from "./dto/create-genre.dto";


@Injectable()
export class GenreService {

    constructor(
        @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
        // @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        // @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
        // @InjectModel(Album.name) private albumModel: Model<AlbumDocument>
    ) {
    }

    async create(dto: CreateGenreDto): Promise<Genre> {
        const genre = await this.genreModel.create({ ...dto})
        return genre
    }

    async getAll(q, count, offset): Promise<Genre[]> {
        const genre = await this.genreModel.find()
            .skip(Number(offset))
            .limit(Number(count))
        return genre
    }

    async getOne(id: ObjectId): Promise<Genre> {
        const genre = await this.genreModel.findById(id)
        return genre
    }

    async delete(id: ObjectId): Promise<Genre> {
        const deletedGenre = await this.genreModel.findByIdAndDelete(id)
        return deletedGenre
    }

    async update(id, dto) {
        const genre = await this.genreModel.findByIdAndUpdate(id, dto, { new: true })
        return genre
    }
}
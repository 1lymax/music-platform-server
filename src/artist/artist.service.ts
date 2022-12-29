import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {Model, ObjectId} from "mongoose";
import {Artist, ArtistDocument} from "./artist.schema";


@Injectable()
export class ArtistService {

    constructor(
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>
    ) {
    }

    async create(dto) {
        const artistExist = await this.artistModel.find({name: dto.name})
        if (artistExist.length > 0) return artistExist

        const artist = await this.artistModel.create({...dto})
        return artist
    }

    async getAll(count = 10, offset = 0): Promise<Artist[]> {
        const tracks = await this.artistModel.find().skip(Number(offset)).limit(Number(count))
        return tracks
    }

    async getOne(id: ObjectId): Promise<Artist> {
        const track = await this.artistModel.findById(id).populate('tracks')
        return track
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.artistModel.findByIdAndDelete(id)
        return track.id
    }
    //
    // async addComment(dto: CreateCommentDto): Promise<Comment> {
    //     const track = await this.trackModel.findById(dto.trackId)
    //     const comment = await this.commentModel.create({...dto})
    //     track.comments.push(comment)
    //     await track.save()
    //     return comment
    // }
    //
    // async listen(id: ObjectId)  {
    //     const track = await this.trackModel.findById(id)
    //     track.listens += 1
    //     track.save()
    // }

    async search(query: string): Promise<Artist[]> {
        const artists = await this.artistModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
        return artists
    }

    async update(id, dto) {
        const artist = await this.artistModel.findByIdAndUpdate(id, dto, {new: true})
        return artist
    }
}
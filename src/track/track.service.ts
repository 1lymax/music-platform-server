import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./track.schema";
import {Model} from "mongoose";
import {CommentDocument} from "./comment.schema";


@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Track.name) private commentModel: Model<CommentDocument>
    ) {
    }

    async create() {
        const track = await this.trackModel.create({})
    }

    async getAll() {

    }

    async getOne() {

    }

    async delete() {

    }
}
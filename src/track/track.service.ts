import {Model, ObjectId} from "mongoose";
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./track.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {FileService, FileType} from "../file/file.service";
import {Album, AlbumDocument} from "../album/album.schema";
import {Artist, ArtistDocument} from "../artist/artist.schema";
import {CreateCommentDto} from "../comments/dto/create-comment.dto";
import {Comment, CommentDocument} from "../comments/comment.schema";


@Injectable()
export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        private fileService: FileService
    ) {
    }

    async create(dto: CreateTrackDto): Promise<Track> {
        let audioPath;
        let picturePath;
        if (false && dto.audio)
            audioPath = this.fileService.createFile(FileType.AUDIO, dto.audio);
        if (false && dto.picture)
            picturePath = this.fileService.createFile(FileType.IMAGE, dto.picture);

        const track = await this.trackModel.create({ ...dto, listens: 0, audio: audioPath, picture: picturePath });

        if (dto.artist) {
            const artist = await this.artistModel.findById(dto.artist);
            artist.tracks.push(track);
            artist.save();
        }
        if (dto.album) {
            const album = await this.albumModel.findById(dto.album);
            album.tracks.push(track);
            album.save();
        }

        return track;
    }

    async getAll(q, count, offset): Promise<Track[]> {
        const query: any = { audio: { $nin: [null, ""] } };
        if (q)
            query.name = { $regex: new RegExp(query, "i") };
        const tracks = await this.trackModel.find(query)
            .skip(Number(offset))
            .limit(Number(count))
            .populate("artist")
            .populate("album");
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate("comments");
        return track;
    }

    async delete(id: ObjectId): Promise<Track> {
        const deletedTrack = await this.trackModel.findByIdAndDelete(id);
        return deletedTrack;
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({ ...dto });
        track.comments.push(comment);
        await track.save();
        return comment;
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save();
    }

    async search(query: string): Promise<Track[]> {
        const tracks = await this.trackModel.find({
            name: { $regex: new RegExp(query, "i") }
        });
        return tracks;
    }

    async update(id, dto, picture, audio) {
        if (picture) {
            const currentTrack = await this.trackModel.findById(id);
            this.fileService.removeFile(currentTrack.picture);
            const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
            dto.picture = picturePath;
        }
        if (audio) {
            const currentTrack = await this.trackModel.findById(id);
            this.fileService.removeFile(currentTrack.audio);
            const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
            dto.audio = audioPath;
        }
        const track = await this.trackModel.findByIdAndUpdate(id, dto, { new: true });
        return track;
    }

    async deletePicture(id) {
        const track = await this.trackModel.findById(id);
        if (track.picture) {
            await this.fileService.removeFile(track.picture);
            track.picture = "";
            await track.save();
        }
        return track;
    }

}
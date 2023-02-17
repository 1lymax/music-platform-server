import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import {Model, ObjectId} from "mongoose";
import {Playlist, PlaylistDocument} from "./playlist.schema";
import {FileService, FileType} from "../file/file.service";
import {Track, TrackDocument} from "../track/track.schema";
import {User, UserDocument} from "../users/user.schema";
import {AccessibleModel} from "@casl/mongoose";


@Injectable()
export class PlaylistService {
    constructor(
        @InjectModel(Playlist.name) private playlistModel: AccessibleModel<PlaylistDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private fileService: FileService,
    ) {

    }

    async create(dto, picture, user) {
        let picturePath
        if (picture)
            picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const playlist = await this.playlistModel.create({ ...dto, picture: picturePath, user: user.id })
        return playlist
    }

    delete(id: ObjectId, ability) {
        const playlist = this.playlistModel.findByIdAndDelete(id)
            .accessibleBy(ability)
        return playlist
    }

    async update(id, dto, picture, ability) {
        const currentPlaylist = await this.playlistModel.findById(id)
            .accessibleBy(ability)
        console.log(currentPlaylist)
        if (picture && currentPlaylist) {
            //@ts-ignore
            this.fileService.removeFile(currentPlaylist.picture)
            const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
            dto.picture = picturePath
        }
        const playlist = this.playlistModel.findByIdAndUpdate(id, dto, { new: true })
            .accessibleBy(ability)
        return playlist
    }

    async deletePicture(id, ability) {
        const playlist = await this.playlistModel.findById(id)
            .accessibleBy(ability)
        //@ts-ignore
        if (playlist?.picture) {
            //@ts-ignore
            await this.fileService.removeFile(playlist.picture)
            //@ts-ignore
            playlist.picture = ''
            //@ts-ignore
            await playlist.save()
        }
        return playlist
    }

    getOne(id: ObjectId, ability) {
        const playlist = this.playlistModel.findById(id)
            .populate('tracks')
            .accessibleBy(ability)
        return playlist
    }

    getPublicPlaylists(q, count, offset) {
        let query: any = { public: true }
        if (q)
            query.name = { $regex: q, $options: "i" };
        return this.playlistModel.find(query).skip(offset).limit(count)
    }

    getUserPlaylists(q, count, offset, id, ability) {
        let query: any = { user: id }
        if (q)
            query.name = { $regex: q, $options: "i" };
        console.log(query)
        return this.playlistModel.find(query)
            .skip(offset)
            .limit(count)
            .accessibleBy(ability)

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

    async addTrack(id: ObjectId, trackId: ObjectId, ability) {
        if (id && trackId) {
            const playlist = await this.playlistModel.findById(id)
                .accessibleBy(ability)
            if (playlist) {
                const track = await this.trackModel.findById(trackId)
                //@ts-ignore
                playlist.tracks.push(track)
                //@ts-ignore
                playlist.save()
                return playlist && playlist
            }
        }
        return null
    }

    async removeTrack(id: ObjectId, trackId: ObjectId, ability) {
        if (id && trackId) {
            const playlist = await this.playlistModel.findOneAndUpdate({ _id: id }, {
                $pull: {
                    tracks: trackId
                }
            }, { new: true })
                .accessibleBy(ability)
            return playlist && playlist
        }
        return null
    }
}
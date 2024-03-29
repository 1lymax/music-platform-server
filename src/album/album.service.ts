import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";

import * as mongoose from "mongoose";
import {Model, ObjectId} from "mongoose";
import {Album, AlbumDocument} from "./album.schema";
import {FileService, FileType} from "../file/file.service";


@Injectable()
export class AlbumService {

    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        private fileService: FileService
    ) {
    }

    async create(dto, picture) {
        const albumExist = await this.albumModel.find({name: dto.name, album: dto.album})
        if (albumExist.length > 0) return albumExist

        let picturePath
        if (picture) picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        console.log(dto);

        const album = await this.albumModel.create({...dto, picture: picturePath})
        return album
    }

    async getAll(count = 0, offset = 0): Promise<Album[]> {
        let albums
        if (count) {
            albums = await this.albumModel.find().skip(Number(offset)).limit(Number(count))
        } else {
            albums = await this.albumModel.find().skip(Number(offset))
        }
        return albums
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id).populate('tracks')
        return album
    }

    async search(query: any): Promise<Album[]> {
        let queryCond: any = {}
        if(query.name){
            queryCond.name={$regex:query.name,$options:"i"};
        }
        if(query.artist){
            queryCond.artist=query.artist;
        }
        const albums = await this.albumModel.find(queryCond)
        return albums
    }

    async filterByArtist(query: any): Promise<Album[]> {
        if (!query.artist || !mongoose.Types.ObjectId.isValid(query.artist))
            return []
        const albums = await this.albumModel.find({artist: query.artist}).sort({"name": 1})
        return albums
    }

    async delete(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findByIdAndDelete(id)
        return album
    }

    async update(id, dto, picture) {
        if (picture) {
            const currentAlbum = await this.albumModel.findById(id)
            this.fileService.removeFile(currentAlbum.picture)
            const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
            dto.picture = picturePath
        }
        const album = await this.albumModel.findByIdAndUpdate(id, dto, {new: true})
        return album
    }

    async deletePicture(id) {
        const album = await this.albumModel.findById(id)
        if (album.picture){
            await this.fileService.removeFile(album.picture)
            album.picture = ''
            await album.save()
        }
        return album
    }

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
}
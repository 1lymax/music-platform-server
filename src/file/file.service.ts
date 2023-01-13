import * as fs from "fs";
import * as uuid from 'uuid'
import * as path from "path";
import * as https from "https";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";


export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image',
    AVATAR = 'avatar'
}


@Injectable()
export class FileService {

    createFile(type: FileType, file: any): string {
        const isUrl = typeof file === "string" && file.substring(0, 4) === 'http'
        try {
            if (isUrl) {
                const { fileName, filePath } = this.generateName(type, file, 'jpg')
                this.createPath(filePath)
                this.downloadAndSave(file, path.resolve(filePath, fileName), () => console.log(''))
                return type + '/' + fileName
            } else {
                return this.saveFile(type, file)
            }
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    generateName(type: FileType, file, ext = null) {
        const fileExtension = ext ? ext : file.originalname.split('.').pop()
        const fileName = uuid.v1() + '.' + fileExtension
        const filePath = path.resolve(__dirname, '..', 'static', type)
        return { fileName, filePath }
    }

    saveFile(type: FileType, file): string {
        const { fileName, filePath } = this.generateName(type, file)

        this.createPath(filePath)
        fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
        return type + '/' + fileName
    }

    removeFile(fileName: string) {
        try {
            if (fileName) {
                const filePath = path.resolve(__dirname, '..', 'static', fileName)
                if (fs.existsSync(filePath)) {
                    fs.rmSync(filePath)
                }
            }
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    downloadAndSave(url: string, dest: string, cb) {
        const file = fs.createWriteStream(dest);
        https
            .get(url, function (response) {
                response.pipe(file);
                console.log(file)
                file.on('finish', function () {
                    file.close(cb);
                });
            })
            .on('error', function (err) {
                fs.unlink(dest, cb(err.message));
            });
    };

    createPath (filePath) {
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true })
        }
    }


}
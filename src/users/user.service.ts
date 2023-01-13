import {Model} from "mongoose";
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";
import * as bcrypt from 'bcrypt'
import {salt} from "../data/data";
import {FileService, FileType} from "../file/file.service";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private fileService: FileService
    ) {}

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email: email }).lean()
        return user
    }

    async createUser(dto) {
        const userExist = await this.userModel.findOne({ email: dto.email })
        if (userExist)
            return { message: 'User with this email already exists' }
        const { password, ...rest } = dto
        let hashPass
        if (password)
            hashPass = await bcrypt.hash(password, salt)
        if (rest.picture)
            rest.picture = this.fileService.createFile(FileType.AVATAR, rest.picture)

        const user = await this.userModel.create({ password: hashPass, ...rest })
        return user
    }
}

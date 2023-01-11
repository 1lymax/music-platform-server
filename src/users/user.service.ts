import {Model} from "mongoose";
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";
import * as bcrypt from 'bcrypt'
import {salt} from "../data/data";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async findOne(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email })
        return user
    }

    async createUser(dto) {
        const userExist = await this.userModel.findOne({ email: dto.email })
        if (userExist)
            return { message: 'User with this email already exists' }
        const { password, ...rest } = dto
        const hashPass = await bcrypt.hash(password, salt)
        const user = await this.userModel.create({ password: hashPass, ...rest })
        return user
    }
}

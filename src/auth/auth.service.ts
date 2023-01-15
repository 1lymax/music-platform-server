import {BadRequestException, Injectable, InternalServerErrorException,} from '@nestjs/common';
import {UserService} from "../users/user.service";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email)
        const passCheck = await bcrypt.compare(password, user.password)
        if (user && passCheck) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async generateJwt(user: any) {
        const payload = { email: user.email, _id: user._id, name: user.name, picture: user.picture }
        const jwt = await this.jwtService.signAsync(payload)
        return jwt
    }

    async signIn(user) {
        if (!user) {
            throw new BadRequestException('Unauthenticated')
        }

        const userExists = await this.usersService.findOneByEmail(user.email)
        if (!userExists) {
            return this.createUser(user)
        }

        return this.generateJwt(userExists)
    }

    async createUser(user: CreateUserDto) {
        try {
            const newUser = await this.usersService.createUser(user)
            return await this.generateJwt(newUser)
        } catch(e) {
            console.log(e)
            throw new InternalServerErrorException()
        }
    }
}

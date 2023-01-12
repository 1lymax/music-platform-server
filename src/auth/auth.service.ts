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

    generateJwt(user: any) {
        const payload = { email: user.email, sub: user._id }
        return this.jwtService.sign(payload)
    }

    async signIn(user) {
        if (!user) {
            throw new BadRequestException('Unauthenticated')
        }

        const userExists = await this.usersService.findOneByEmail(user.email)

        if (!userExists) {
            return this.registerUser(user)
        }

        return this.generateJwt(userExists)
    }

    async registerUser(user: CreateUserDto) {
        try {
            const newUser = await this.usersService.createUser(user)
            return this.generateJwt(newUser)
        } catch {
            throw new InternalServerErrorException()
        }
    }
}

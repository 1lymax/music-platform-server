import {Body, Controller, Post, Put, Request, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() dto:CreateUserDto) {
        return this.userService.createUser(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    updateUser(@Body() dto: UpdateUserDto, @Request() req) {
        return this.userService.updateUser(req.user, dto)
    }
}
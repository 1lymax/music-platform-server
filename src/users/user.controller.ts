import {Body, Controller, Post, Put, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AuthUser} from "../decorators/user.decorator";

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
    updateUser(@Body() dto: UpdateUserDto, @AuthUser() user) {
        return this.userService.updateUser(user, dto)
    }
}
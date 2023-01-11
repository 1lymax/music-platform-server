import {Body, Controller, Post} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('/user')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post()
    create(@Body() dto:CreateUserDto) {
        return this.usersService.createUser(dto)
    }
}
import {Body, Controller, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('/user')
export class UserController {
    constructor(private usersService: UserService) {
    }

    @Post()
    create(@Body() dto:CreateUserDto) {
        return this.usersService.createUser(dto)
    }
}
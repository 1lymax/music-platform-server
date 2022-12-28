import {Controller, Get} from "@nestjs/common";


@Controller('/track')
export class TrackController {
    create() {

    }

    @Get()
    getAll() {
        return '--all users--'
    }

    getOne() {

    }

    delete() {

    }

}
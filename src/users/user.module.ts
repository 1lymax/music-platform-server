import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {UserController} from "./user.controller";
import {FileService} from "../file/file.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  providers: [UserService, FileService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}

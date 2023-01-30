import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
    @Prop()
    username?: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    picture: string;

    @Prop()
    isAdmin: boolean;

    @Prop()
    provider: string;

    @Prop()
    providerId: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
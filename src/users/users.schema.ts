import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    username?: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: Date, required: true })
    time: Date;

}

export const UsersSchema = SchemaFactory.createForClass(User);
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {AccessibleModel} from "@casl/mongoose";
import {AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility} from "@casl/ability";

import {Playlist} from "../../playlist/playlist.schema";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}
export type Subjects =
    | InferSubjects<typeof Playlist>
    | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    constructor(
        @InjectModel(Playlist.name) private playlistModel: AccessibleModel<Playlist>
    ) {
    }

    createForUser(user: any) {

        const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);
        // const { can, cannot, build } = new AbilityBuilder(
        //     Ability as AbilityClass<AppAbility>,
        // );

        if (user?.isAdmin) {
            can(Action.Manage, 'all');
        } else {
            //    can(Action.Read, 'all');
        }
        can(Action.Update, this.playlistModel, { user: user._id });
        can(Action.Delete, this.playlistModel, { user: user._id });
        can(Action.Read, this.playlistModel, { public: true });
        can(Action.Read, this.playlistModel, { user: user._id });


        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}

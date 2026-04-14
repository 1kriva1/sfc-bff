import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { GameRoute } from "@share/enums";
import { GameCreatePageRoute } from "../../../../../../../../parts/general/pages/create/game-create-page-route.enum";
import { GameProfileEditRoute } from "../../enums/game-profile-edit-route.enum";

export class GameInventaryProfileEditConstants {
    static PROGRESS_KEY: string = 'profile.inventary';
    static MIN_SHIRTS_COUNT: number = 1;
    static MAX_SHIRTS_COUNT: number = 100;
    static PROGRESS_CREATE_COMMAND: string = buildPath(`${GameRoute.Games}/${RouteKey.Create}/${GameCreatePageRoute.Profile}/${GameProfileEditRoute.Inventary}`);
}
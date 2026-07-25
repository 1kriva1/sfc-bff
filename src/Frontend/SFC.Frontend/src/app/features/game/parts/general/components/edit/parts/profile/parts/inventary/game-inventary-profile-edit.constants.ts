import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { Route } from "@share/enums";
import { GameProfileEditRoute } from "../../enums/game-profile-edit-route.enum";
import { IFormProgressParameters } from "@share/components";
import { GameEditRoute } from "../../../../enums/game-edit-route.enum";

export class GameInventaryProfileEditConstants {
    static MIN_SHIRTS_COUNT: number = 1;
    static MAX_SHIRTS_COUNT: number = 100;
    static Progress: IFormProgressParameters = {
        key: 'profile.inventary',
        url: buildPath(`${Route.Games}/${RouteKey.Create}/${GameEditRoute.Profile}/${GameProfileEditRoute.Inventary}`)
    };
}
import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { Route } from "@share/enums";
import { GameProfileEditRoute } from "../../enums/game-profile-edit-route.enum";
import { IFormProgressParameters } from "@share/components";
import { GameEditRoute } from "../../../../enums/game-edit-route.enum";

export class GameGeneralProfileEditConstants {
    static Progress: IFormProgressParameters = {
        key: 'profile.general',
        url: buildPath(`${Route.Games}/${RouteKey.Create}/${GameEditRoute.Profile}/${GameProfileEditRoute.General}`)
    };
}
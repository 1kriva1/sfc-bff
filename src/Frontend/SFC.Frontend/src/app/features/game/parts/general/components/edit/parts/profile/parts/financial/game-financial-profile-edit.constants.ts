import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { GameProfileEditRoute } from "../../enums/game-profile-edit-route.enum";
import { Route } from "@share/enums";
import { IFormProgressParameters } from "@share/components";
import { GameEditRoute } from "../../../../enums/game-edit-route.enum";

export class GameFinancialProfileEditConstants {
    static MIN_PAY_AMOUNT: number = 1;
    static Progress: IFormProgressParameters = {
        key: 'profile.financial',
        url: buildPath(`${Route.Games}/${RouteKey.Create}/${GameEditRoute.Profile}/${GameProfileEditRoute.Financial}`)
    };
}
import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { GameRoute } from "@share/enums";
import { GameCreatePageRoute } from "../../../../../../../../parts/general/pages/create/game-create-page-route.enum";
import { GameProfileEditRoute } from "../../enums/game-profile-edit-route.enum";

export class GameFinancialProfileEditConstants {
    static PROGRESS_KEY: string = 'profile.financial';
    static MIN_PAY_AMOUNT: number = 1;
    static PROGRESS_CREATE_COMMAND: string = buildPath(`${GameRoute.Games}/${RouteKey.Create}/${GameCreatePageRoute.Profile}/${GameProfileEditRoute.Financial}`);
}
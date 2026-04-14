import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { GameRoute } from "@share/enums";
import { GameCreatePageRoute } from "../../../../pages/create/game-create-page-route.enum";

export class GameFinalEditConstants {
    static PROGRESS_KEY: string = 'final';
    static PROGRESS_CREATE_COMMAND: string = buildPath(`${GameRoute.Games}/${RouteKey.Create}/${GameCreatePageRoute.Final}`);
}
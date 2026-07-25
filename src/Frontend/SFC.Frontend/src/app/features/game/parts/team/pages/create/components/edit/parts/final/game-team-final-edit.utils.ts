import { buildPath } from "@core/utils";
import { RouteKey } from "@core/enums";
import { Route } from "@share/enums";
import { GameTeamCreatePageRoute } from "../../../../game-team-create-page-route.enum";
import { IFormProgressParameters } from "@share/components";
import { GameTeamFinalEditConstants } from "./game-team-final-edit.constants";

export function getGameTeamFinalProgressParameters(gameId: number): IFormProgressParameters {
    return {
        key: GameTeamFinalEditConstants.ProgressKey,
        url: buildPath(`${Route.Games}/${gameId}/${Route.Teams}/${RouteKey.Create}/${GameTeamCreatePageRoute.Final}`)
    };
}
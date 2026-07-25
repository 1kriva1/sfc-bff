import { buildPath } from "@core/utils";
import { RouteKey } from "@core/enums";
import { Route } from "@share/enums";
import { SchemeGameTeamCreatePageRoute } from "../../../../scheme-game-team-create-page-route.enum";
import { IFormProgressParameters } from "@share/components";
import { SchemeGameTeamFinalEditConstants } from "./scheme-game-team-final-edit.constants";

export function getSchemeGameTeamFinalProgressParameters(gameId: number, teamId: number): IFormProgressParameters {
    return {
        key: SchemeGameTeamFinalEditConstants.ProgressKey,
        url: buildPath(`${Route.Schemes}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}/${RouteKey.Create}/${SchemeGameTeamCreatePageRoute.Final}`)
    };
}
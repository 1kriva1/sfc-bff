import { RouteKey } from "@core/enums";
import { IBuildActionParameters } from "@core/models";
import { faInfoCircle, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Route } from "@share/enums";
import { buildRedirectAction } from "@share/utils/actions";

export function buildViewGameTeamAction(gameId: number, teamId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.game.team.view-profile:View game team profile`,
        faInfoCircle,
        parameters.delimeter,
        parameters.router,
        [`${Route.Games}/${gameId}/${Route.Teams}/${teamId}`],
        parameters.state
    );
}

export function buildEditGameTeamAction(gameId: number, teamId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.game.team.edit:Edit game team`,
        faPencil,
        parameters.delimeter,
        parameters.router,
        [`${Route.Games}/${gameId}/${Route.Teams}/${teamId}/${RouteKey.Edit}`],
        parameters.state
    );
}
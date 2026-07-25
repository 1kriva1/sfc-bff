import { IBuildActionParameters } from "@core/models";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Route } from "@share/enums";
import { buildRedirectAction } from "@share/utils/actions";

export function buildViewGamePlayerAction(gameId: number, playerId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.game.player.view-profile:View game player profile`,
        faInfoCircle,
        parameters.delimeter,
        parameters.router,
        [`${Route.Games}/${gameId}/${Route.Players}/${playerId}`],
        parameters.state
    );
}
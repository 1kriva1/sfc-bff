import { IBuildActionParameters } from "@core/models";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Route } from "@share/enums";
import { buildRedirectAction } from "@share/utils/actions";

export function buildViewGameAction(gameId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.game.general.view-profile:View game profile`,
        faInfoCircle,
        parameters.delimeter,
        parameters.router,
        [`${Route.Games}/${gameId}`],
        parameters.state
    );
}
import { IBuildActionParameters } from "@core/models";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { SchemeRoute, TeamRoute } from "@share/enums";
import { buildRedirectAction } from "@share/utils/actions";

export function buildViewSchemeTeamAction(teamId: number, schemeId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.scheme.team.action.view-profile:View team scheme profile`,
        faInfoCircle,
        false,
        parameters.router,
        [`${SchemeRoute.Schemes}/${schemeId}/${TeamRoute.Teams}/${teamId}`],
        parameters.state
    );
}

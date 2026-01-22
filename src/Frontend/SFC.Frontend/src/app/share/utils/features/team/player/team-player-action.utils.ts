import { Router } from "@angular/router";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { PlayerRoute, TeamRoute } from "@share/enums";
import { buildRedirectAction } from "@share/utils/actions";

export function buildViewTeamPlayerAction(teamId: number, playerId: number, router: Router, state: any = undefined): IDropdownMenuItemModel {
    return buildRedirectAction(
        $localize`:@@share.utils.features.team.player.action.view-profile:View team player profile`,
        faPeopleGroup,
        false,
        router,
        [`${TeamRoute.Teams}/${teamId}/${PlayerRoute.Players}/${playerId}`],
        state
    );
}
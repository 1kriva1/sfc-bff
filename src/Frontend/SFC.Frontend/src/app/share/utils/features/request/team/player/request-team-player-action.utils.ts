import { Router } from "@angular/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ITeamSearchTableModel } from "@share/components";
import { PlayerRoute, RequestRoute, TeamRoute } from "@share/enums";
import { buildRedirectAction } from "@share/utils";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export function buildRequestTeamPlayerAction(team: ITeamSearchTableModel, router: Router): IDropdownMenuItemModel {
    return buildRedirectAction(
        $localize`:@@share.utils.features.request.action.create:Create team player request`,
        faPlus,
        true,
        router,
        [`${RequestRoute.Requests}/${TeamRoute.Teams}/${team.id}/${PlayerRoute.Players}/1`],
        team
    );
}
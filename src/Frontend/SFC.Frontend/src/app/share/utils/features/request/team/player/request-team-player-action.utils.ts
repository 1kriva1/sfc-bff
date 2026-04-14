import { Router } from "@angular/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ITeamSearchTableModel } from "../../../../../components/features/team/general/search/table/team-search-table.model";
import { PlayerRoute, RequestRoute, TeamRoute } from "@share/enums";
import { buildRedirectAction } from "@share/utils";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export function buildRequestTeamPlayerAction(team: ITeamSearchTableModel, router: Router): IDropdownMenuItemModel {
    return buildRedirectAction(
        $localize`:@@share.utils.features.request.action.create:Create team player request`,
        faPlus,
        false,
        router,
        [`${RequestRoute.Requests}/${TeamRoute.Teams}/${team.id}/${PlayerRoute.Players}/1`],
        team
    );
}
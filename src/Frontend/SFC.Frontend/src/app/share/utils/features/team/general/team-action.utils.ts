import { Router } from "@angular/router";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { RouteKey } from "@core/enums";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { buildRedirectAction } from "@share/utils/actions";
import { TeamRoute } from "@share/enums";

export function buildViewTeamAction(teamId: number, router: Router): IDropdownMenuItemModel {
    return buildRedirectAction(
        $localize`:@@share.utils.features.team.action.view-profile:View team profile`,
        faPeopleGroup,
        false,
        router,
        [`${TeamRoute.Teams}/${teamId}`]
    );
}

export function buildEditTeamAction(teamId: number, router: Router): IDropdownMenuItemModel {
    return buildRedirectAction(
        $localize`:@@share.utils.features.team.action.edit-profile:Edit team profile`,
        faPenToSquare,
        false,
        router,
        [`${TeamRoute.Teams}/${teamId}/${RouteKey.Edit}`]
    );
}
import { Router } from "@angular/router";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { TeamRoute } from "../../../enums";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { buildRedirectAction } from "../../actions/actions.utils";

export function buildViewTeamAction(teamId: number, router: Router): IDropdownMenuItemModel {
    return buildRedirectAction(
        $localize`:@@share.utils.features.team.action.view-profile:View team profile`,
        faPeopleGroup,
        false,
        router,
        [`${TeamRoute.Teams}/${teamId}`]
    );
}
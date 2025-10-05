import { Router } from "@angular/router";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { PlayerRoute } from "../../../enums";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { buildRedirectAction } from "../../actions/actions.utils";

export function buildViewPlayerAction(playerId: number, router: Router): IDropdownMenuItemModel {
    return buildRedirectAction(
        $localize`:@@share.utils.actions.player.view-profile:View player profile`,
        faUser,
        false,
        router,
        [`${PlayerRoute.Players}/${playerId}`]
    );
}
import { Data } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { GameConstants, TeamConstants } from "@share/constants";
import { Route } from "@share/enums";

export class SchemeGameTeamCreatePageConstants {
    static ALLOW_ACCESS_ROUTE_DATA: Data = {
        layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
        scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL,
        redirectUrl: buildPath(`${Route.Schemes}/${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/${GameConstants.ID_ROUTE_PATH}/${Route.Teams}/${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Create}`)
    };
}
import { Data } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { GameRoute } from "@share/enums";

export class GameCreatePageConstants {
    static ALLOW_ACCESS_ROUTE_DATA: Data = {
        layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
        scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL,
        redirectUrl: buildPath(`${GameRoute.Games}/${RouteKey.Create}`)
    };

    static DISABLED_AUTO_SCROLL_ROUTE_DATA: Data = {
        layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
        scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
    };
}
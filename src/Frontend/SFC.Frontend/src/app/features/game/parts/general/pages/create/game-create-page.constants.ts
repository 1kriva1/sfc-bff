import { Data } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { RouteKey } from "@core/enums";
import { buildPath } from "@core/utils";
import { Route } from "@share/enums";

export class GameCreatePageConstants {
    static ALLOW_ACCESS_ROUTE_DATA: Data = {
        layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
        scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL,
        redirectUrl: buildPath(`${Route.Games}/${RouteKey.Create}`)
    };
}
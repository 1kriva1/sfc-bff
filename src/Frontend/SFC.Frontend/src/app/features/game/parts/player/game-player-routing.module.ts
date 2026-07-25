import { Routes } from "@angular/router";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile } from "@core/guards";
import { PlayerConstants } from "@share/constants";
import { PlayerRoute } from "@share/enums";
import { RouteConstants } from "@core/constants";
import {
    GamePlayerViewPageComponent,
    GamePlayerViewPageConstants,
    GamePlayerViewPageResolver
} from "./pages";

export const GamePlayerRoutes: Routes = [
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${PlayerRoute.Players}/:${PlayerConstants.ID_ROUTE_PATH}`,
        component: GamePlayerViewPageComponent,
        resolve: { [GamePlayerViewPageConstants.RESOLVE_KEY]: GamePlayerViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: []
    },
];
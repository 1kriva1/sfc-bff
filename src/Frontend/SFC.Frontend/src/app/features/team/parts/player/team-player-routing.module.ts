import { Routes } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile } from "@core/guards";
import { PlayerRoute } from "@share/enums";
import {
    TeamPlayerViewGeneralProfileComponent, TeamPlayerViewPageComponent, TeamPlayerViewPageConstants,
    TeamPlayerViewPageResolver, TeamPlayerViewPageRoute, TeamPlayerViewProfileComponent,
    TeamPlayerViewProfileRoute
} from "./pages/view";

export const TeamPlayerRoutes: Routes = [
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${PlayerRoute.Players}/:${RouteConstants.ID_ROUTE_PATH}`,
        component: TeamPlayerViewPageComponent,
        resolve: { [TeamPlayerViewPageConstants.RESOLVE_KEY]: TeamPlayerViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: [
            {
                path: TeamPlayerViewPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamPlayerViewProfileComponent,
                children: [
                    {
                        path: TeamPlayerViewProfileRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamPlayerViewGeneralProfileComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: TeamPlayerViewProfileRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: TeamPlayerViewPageRoute.Profile,
                pathMatch: 'full'
            }
        ]
    }
];
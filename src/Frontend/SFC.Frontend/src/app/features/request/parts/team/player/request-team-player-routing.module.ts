import { Routes } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile } from "@core/guards";
import { PlayerConstants, TeamConstants } from "@share/constants";
import { PlayerRoute, TeamRoute } from "@share/enums";
import { RequestTeamPlayerViewFootballProfileComponent } from "./pages/view/components/profile/parts/football/request-team-player-view-football-profile.component";
import { RequestTeamPlayerViewGeneralProfileComponent } from "./pages/view/components/profile/parts/general/request-team-player-view-general-profile.component";
import { RequestTeamPlayerViewProfileRoute } from "./pages/view/components/profile/request-team-player-view-profile-route.enum";
import { RequestTeamPlayerViewProfileComponent } from "./pages/view/components/profile/request-team-player-view-profile.component";
import { RequestTeamPlayerViewPageRoute } from "./pages/view/request-team-player-view-page-route.enum";
import { RequestTeamPlayerViewPageComponent } from "./pages/view/request-team-player-view-page.component";
import { RequestTeamPlayerViewPageConstants } from "./pages/view/request-team-player-view-page.constants";
import { RequestTeamPlayerViewPageResolver } from "./pages/view/request-team-player-view-page.resolver";

export const RequestTeamPlayerRoutes: Routes = [
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${TeamRoute.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${PlayerRoute.Players}/:${PlayerConstants.ID_ROUTE_PATH}`,
        component: RequestTeamPlayerViewPageComponent,
        resolve: { [RequestTeamPlayerViewPageConstants.RESOLVE_KEY]: RequestTeamPlayerViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: [
            {
                path: RequestTeamPlayerViewPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: RequestTeamPlayerViewProfileComponent,
                children: [
                    {
                        path: RequestTeamPlayerViewProfileRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: RequestTeamPlayerViewGeneralProfileComponent
                    },
                    {
                        path: RequestTeamPlayerViewProfileRoute.Football,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: RequestTeamPlayerViewFootballProfileComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: RequestTeamPlayerViewProfileRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: RequestTeamPlayerViewPageRoute.Profile,
                pathMatch: 'full'
            }
        ]
    }
];
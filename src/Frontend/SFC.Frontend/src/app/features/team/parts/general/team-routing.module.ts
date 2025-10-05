import { Routes } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildTitle } from "@core/utils";
import {
    TeamAvailabilityProfileEditComponent, TeamFinancialProfileEditComponent, TeamGeneralProfileEditComponent,
    TeamProfileEditComponent, TeamProfileEditRoute
} from "./components";
import {
    TeamCreatePageComponent, TeamCreatePageLocalization, TeamCreatePageRoute,
    TeamCreatePlayersComponent, TeamCreatePlayersInviteComponent, TeamCreatePlayersRoute
} from "./pages/create";
import {
    TeamEditPageComponent, TeamEditPageConstants, TeamEditPageResolver,
    TeamEditPageRoute, TeamEditPlayersComponent, TeamEditPlayersInviteComponent,
    TeamEditPlayersRequestComponent, TeamEditPlayersRoute, TeamEditPlayersSquadComponent,
    TeamEditSchemesComponent
} from "./pages/edit";

export const TeamRoutes: Routes = [
    {
        path: RouteKey.Create,
        component: TeamCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle(TeamCreatePageLocalization.ROUTE.TITLE),
        children: [
            {
                path: TeamCreatePageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamProfileEditComponent,
                children: [
                    {
                        path: TeamProfileEditRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamGeneralProfileEditComponent
                    },
                    {
                        path: TeamProfileEditRoute.Availability,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamAvailabilityProfileEditComponent
                    },
                    {
                        path: TeamProfileEditRoute.Financial,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamFinancialProfileEditComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: TeamProfileEditRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: TeamCreatePageRoute.Players,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamCreatePlayersComponent,
                children: [
                    {
                        path: TeamCreatePlayersRoute.Invites,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamCreatePlayersInviteComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: TeamCreatePlayersRoute.Invites,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: TeamCreatePageRoute.Profile,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: TeamEditPageComponent,
        resolve: { [TeamEditPageConstants.RESOLVE_KEY]: TeamEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: [
            {
                path: TeamEditPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamProfileEditComponent,
                children: [
                    {
                        path: TeamProfileEditRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamGeneralProfileEditComponent
                    },
                    {
                        path: TeamProfileEditRoute.Availability,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamAvailabilityProfileEditComponent
                    },
                    {
                        path: TeamProfileEditRoute.Financial,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamFinancialProfileEditComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: TeamProfileEditRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: TeamEditPageRoute.Players,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamEditPlayersComponent,
                children: [
                    {
                        path: TeamEditPlayersRoute.Squad,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamEditPlayersSquadComponent
                    },
                    {
                        path: TeamEditPlayersRoute.Invites,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamEditPlayersInviteComponent
                    },
                    {
                        path: TeamEditPlayersRoute.Requests,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamEditPlayersRequestComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: TeamEditPlayersRoute.Squad,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: TeamEditPageRoute.Schemes,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamEditSchemesComponent
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: TeamEditPageRoute.Profile,
                pathMatch: 'full'
            }
        ]
    }
];
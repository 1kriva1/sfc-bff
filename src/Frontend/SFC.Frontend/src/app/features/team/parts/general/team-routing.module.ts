import { Routes } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildTitle } from "@core/utils";
import {
    TeamAvailabilityProfileEditComponent, 
    TeamFinancialProfileEditComponent, 
    TeamGeneralProfileEditComponent,
    TeamProfileEditComponent, 
    TeamProfileEditRoute
} from "./components";
import {
    TeamCreatePageComponent, 
    TeamCreatePageLocalization, 
    TeamCreatePageRoute,
    TeamCreatePlayersComponent, 
    TeamCreatePlayersInviteComponent, 
    TeamCreatePlayersRoute
} from "./pages/create";
import {
    TeamEditPageComponent, 
    TeamEditPageConstants, 
    TeamEditPageResolver,
    TeamEditPageRoute, 
    TeamEditPlayersComponent, 
    TeamEditPlayersInviteComponent,
    TeamEditPlayersRequestComponent, 
    TeamEditPlayersRoute, 
    TeamEditPlayersSquadComponent,
    TeamEditSchemesComponent
} from "./pages/edit";
import {
    TeamSearchPageComponent, 
    TeamSearchPageLocalization
} from "./pages/search"
import { 
    TeamViewOverviewComponent, 
    TeamViewPageComponent, 
    TeamViewPageConstants, 
    TeamViewPageResolver, 
    TeamViewPageRoute, 
    TeamViewPlayersComponent, 
    TeamViewSchemesComponent, 
    TeamViewStatisticComponent, 
    TeamViewStatisticGamesComponent, 
    TeamViewStatisticOverallComponent, 
    TeamViewStatisticPlayersComponent, 
    TeamViewStatisticRoute, 
    TeamViewStatisticSchemesComponent, 
    TeamViewStatsComponent 
} from "./pages/view";

export const TeamRoutes: Routes = [
    // page/create
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
    // page/edit
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
    },
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}`,
        component: TeamViewPageComponent,
        resolve: { [TeamViewPageConstants.RESOLVE_KEY]: TeamViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: [
            {
                path: TeamViewPageRoute.Overview,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamViewOverviewComponent
            },
            {
                path: TeamViewPageRoute.Players,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamViewPlayersComponent
            },
            {
                path: TeamViewPageRoute.Schemes,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamViewSchemesComponent
            },
            {
                path: TeamViewPageRoute.Stats,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamViewStatsComponent
            },
            {
                path: TeamViewPageRoute.Statistic,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: TeamViewStatisticComponent,
                children: [
                    {
                        path: TeamViewStatisticRoute.Overall,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamViewStatisticOverallComponent
                    },
                    {
                        path: TeamViewStatisticRoute.Players,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamViewStatisticPlayersComponent
                    },
                    {
                        path: TeamViewStatisticRoute.Games,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamViewStatisticGamesComponent
                    },
                    {
                        path: TeamViewStatisticRoute.Schemes,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: TeamViewStatisticSchemesComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: TeamViewStatisticRoute.Overall,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: TeamViewPageRoute.Overview,
                pathMatch: 'full'
            }
        ]
    },
    // default
    // page/search
    {
        path: RouteConstants.DEFAULT_ROUTE_PATH,
        component: TeamSearchPageComponent,
        title: buildTitle(TeamSearchPageLocalization.ROUTE.TITLE)
    }
];
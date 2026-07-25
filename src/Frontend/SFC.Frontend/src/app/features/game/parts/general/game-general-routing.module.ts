import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { CanActivateOnlyOneTimeAccess, CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildFallbackRoute, buildTitle } from "@core/utils";
import {
    GameFinancialProfileEditComponent,
    GameGeneralProfileEditComponent,
    GameInventaryProfileEditComponent,
    GameProfileEditComponent,
    GameProfileEditRoute
} from "./components";
import {
    GameCreatePageComponent,
    GameCreatePageConstants,
    GameCreatePageLocalization,
    GameCreatePageRoute,
    GameEditInvitesComponent,
    GameEditInvitesRoute,
    GameEditPageComponent,
    GameEditPageConstants,
    GameEditPageResolver,
    GameEditPageRoute,
    GameEditPlayerInvitesComponent,
    GameEditPlayerRequestsComponent,
    GameEditPlayersComponent,
    GameEditRequestsComponent,
    GameEditRequestsRoute,
    GameEditTeamInvitesComponent,
    GameEditTeamRequestsComponent,
    GameEditTeamsComponent,
    GameFinalEditComponent,
    GameTeamsEditComponent
} from "./pages";

export const GameGeneralRoutes: Routes = [
    // page/create
    {
        path: RouteKey.Create,
        component: GameCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle(GameCreatePageLocalization.ROUTE.TITLE),
        children: [
            {
                path: GameCreatePageRoute.Teams,
                data: {
                    layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                    scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                },
                component: GameTeamsEditComponent
            },
            {
                path: GameCreatePageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameProfileEditComponent,
                children: [
                    {
                        path: GameProfileEditRoute.General,
                        component: GameGeneralProfileEditComponent,
                        canActivate: [CanActivateOnlyOneTimeAccess],
                        data: GameCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
                    },
                    {
                        path: GameProfileEditRoute.Inventary,
                        component: GameInventaryProfileEditComponent,
                        canActivate: [CanActivateOnlyOneTimeAccess],
                        data: GameCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
                    },
                    {
                        path: GameProfileEditRoute.Financial,
                        component: GameFinancialProfileEditComponent,
                        canActivate: [CanActivateOnlyOneTimeAccess],
                        data: GameCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
                    },
                    buildFallbackRoute(GameProfileEditRoute.General)
                ]
            },
            {
                path: GameCreatePageRoute.Final,
                component: GameFinalEditComponent,
                canActivate: [CanActivateOnlyOneTimeAccess],
                data: GameCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
            },
            buildFallbackRoute(GameCreatePageRoute.Teams)
        ]
    },
    // page/edit
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: GameEditPageComponent,
        resolve: { [GameEditPageConstants.RESOLVE_KEY]: GameEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: [
            {
                path: GameEditPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameProfileEditComponent,
                children: [
                    {
                        path: GameProfileEditRoute.General,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        },
                        component: GameGeneralProfileEditComponent
                    },
                    {
                        path: GameProfileEditRoute.Inventary,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        },
                        component: GameInventaryProfileEditComponent
                    },
                    {
                        path: GameProfileEditRoute.Financial,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        },
                        component: GameFinancialProfileEditComponent
                    },
                    buildFallbackRoute(GameProfileEditRoute.General)
                ]
            },
            {
                path: GameEditPageRoute.Invites,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameEditInvitesComponent,
                children: [
                    {
                        path: GameEditInvitesRoute.Players,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: GameEditPlayerInvitesComponent
                    },
                    {
                        path: GameEditInvitesRoute.Teams,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: GameEditTeamInvitesComponent
                    }
                ]
            },
            {
                path: GameEditPageRoute.Requests,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameEditRequestsComponent,
                children: [
                    {
                        path: GameEditRequestsRoute.Players,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: GameEditPlayerRequestsComponent
                    },
                    {
                        path: GameEditRequestsRoute.Teams,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: GameEditTeamRequestsComponent
                    }
                ]
            },
            {
                path: GameEditPageRoute.Players,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameEditPlayersComponent
            },
            {
                path: GameEditPageRoute.Teams,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameEditTeamsComponent
            },
            buildFallbackRoute(GameEditPageRoute.Profile)
        ]
    }
];
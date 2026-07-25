import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CanActivateOnlyOneTimeAccess, CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildFallbackRoute, buildTitle } from "@core/utils";
import { TeamConstants } from "@share/constants";
import { Route } from "@share/enums";
import { LayoutConstants, RouteConstants } from "@core/constants";
import {
    GameTeamGeneralProfileEditComponent, 
    GameTeamInventaryProfileEditComponent,
    GameTeamProfileEditComponent, 
    GameTeamProfileEditRoute
} from "./components";
import {
    GameTeamCreatePageComponent,
    GameTeamCreatePageConstants,
    GameTeamCreatePageResolver,
    GameTeamCreatePageRoute,
    GameTeamEditPageComponent,
    GameTeamEditPageConstants,
    GameTeamEditPageResolver,
    GameTeamEditPageRoute,
    GameTeamPlayersComponent,
    GameTeamEditSchemesComponent,
    GameTeamFinalEditComponent,
    GameTeamPlayersEditComponent,
    GameTeamViewPageComponent,
    GameTeamViewPageConstants,
    GameTeamViewPageResolver
} from "./pages";

export const GameTeamRoutes: Routes = [
    // page/create
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Teams}/${RouteKey.Create}`,
        component: GameTeamCreatePageComponent,
        resolve: { [GameTeamCreatePageConstants.RESOLVE_KEY]: GameTeamCreatePageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle('game team'),
        children: [
            {
                path: GameTeamCreatePageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameTeamProfileEditComponent,
                children: [
                    {
                        path: GameTeamProfileEditRoute.General,
                        component: GameTeamGeneralProfileEditComponent,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        }
                    },
                    {
                        path: GameTeamProfileEditRoute.Inventary,
                        component: GameTeamInventaryProfileEditComponent,
                        canActivate: [CanActivateOnlyOneTimeAccess],
                        data: GameTeamCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
                    },
                    buildFallbackRoute(GameTeamProfileEditRoute.General)
                ]
            },
            {
                path: GameTeamCreatePageRoute.Players,
                component: GameTeamPlayersEditComponent,
                canActivate: [CanActivateOnlyOneTimeAccess],
                data: GameTeamCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
            },
            {
                path: GameTeamCreatePageRoute.Final,
                component: GameTeamFinalEditComponent,
                canActivate: [CanActivateOnlyOneTimeAccess],
                data: GameTeamCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
            },
            buildFallbackRoute(GameTeamCreatePageRoute.Profile)
        ]
    },
    // page/edit
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: GameTeamEditPageComponent,
        resolve: { [GameTeamEditPageConstants.RESOLVE_KEY]: GameTeamEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: [
            {
                path: GameTeamEditPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameTeamProfileEditComponent,
                children: [
                    {
                        path: GameTeamProfileEditRoute.General,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        },
                        component: GameTeamGeneralProfileEditComponent
                    },
                    {
                        path: GameTeamProfileEditRoute.Inventary,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        },
                        component: GameTeamInventaryProfileEditComponent
                    },
                    buildFallbackRoute(GameTeamProfileEditRoute.General)
                ]
            },
            {
                path: GameTeamEditPageRoute.Players,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameTeamPlayersComponent
            },
            {
                path: GameTeamEditPageRoute.Schemes,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: GameTeamEditSchemesComponent
            },
            buildFallbackRoute(GameTeamEditPageRoute.Profile)
        ]
    },
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}`,
        component: GameTeamViewPageComponent,
        resolve: { [GameTeamViewPageConstants.RESOLVE_KEY]: GameTeamViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: []
    },
];
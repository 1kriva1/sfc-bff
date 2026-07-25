import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CanActivateOnlyOneTimeAccess, CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildFallbackRoute, buildTitle } from "@core/utils";
import { GameConstants, TeamConstants } from "@share/constants";
import { Route } from "@share/enums";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { SchemeGameTeamConstants } from "./constants/scheme-game-team.constants";
import {
    SchemeGameTeamFormationEditComponent,
    SchemeGameTeamGeneralProfileEditComponent,
    SchemeGameTeamProfileEditComponent,
    SchemeGameTeamProfileEditRoute
} from "./components";
import {
    SchemeGameTeamCreatePageComponent,
    SchemeGameTeamCreatePageConstants,
    SchemeGameTeamCreatePageResolver,
    SchemeGameTeamCreatePageRoute,
    SchemeGameTeamEditPageComponent,
    SchemeGameTeamEditPageResolver,
    SchemeGameTeamEditPageRoute,
    SchemeGameTeamFinalEditComponent,
    SchemeGameTeamViewPageComponent,
    SchemeGameTeamViewPageConstants,
    SchemeGameTeamViewPageResolver
} from "./pages";

export const SchemeGameTeamRoutes: Routes = [
    {
        path: `${Route.Games}/:${GameConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Create}`,
        component: SchemeGameTeamCreatePageComponent,
        resolve: { [SchemeGameTeamConstants.ResolveKey]: SchemeGameTeamCreatePageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle('scheme game team'),
        children: [
            {
                path: SchemeGameTeamCreatePageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeGameTeamProfileEditComponent,
                children: [
                    {
                        path: SchemeGameTeamProfileEditRoute.General,
                        component: SchemeGameTeamGeneralProfileEditComponent,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        }
                    },
                    buildFallbackRoute(SchemeGameTeamProfileEditRoute.General)
                ]
            },
            {
                path: SchemeGameTeamCreatePageRoute.Formation,
                component: SchemeGameTeamFormationEditComponent,
                canActivate: [CanActivateOnlyOneTimeAccess],
                data: SchemeGameTeamCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
            },
            {
                path: SchemeGameTeamCreatePageRoute.Final,
                component: SchemeGameTeamFinalEditComponent,
                canActivate: [CanActivateOnlyOneTimeAccess],
                data: SchemeGameTeamCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
            },
            buildFallbackRoute(SchemeGameTeamCreatePageRoute.Profile)
        ]
    },
    // page/edit
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${GameConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: SchemeGameTeamEditPageComponent,
        resolve: { [SchemeGameTeamConstants.ResolveKey]: SchemeGameTeamEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: [
            {
                path: SchemeGameTeamEditPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeGameTeamProfileEditComponent,
                children: [
                    {
                        path: SchemeGameTeamProfileEditRoute.General,
                        data: {
                            layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL,
                            scroll: RouteConstants.DISABLED_AUTO_SCROLL_MODEL
                        },
                        component: SchemeGameTeamGeneralProfileEditComponent
                    },
                    buildFallbackRoute(SchemeGameTeamProfileEditRoute.General)
                ]
            },
            {
                path: SchemeGameTeamEditPageRoute.Formation,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeGameTeamFormationEditComponent
            },
            buildFallbackRoute(SchemeGameTeamEditPageRoute.Profile)
        ]
    },
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${GameConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}`,
        component: SchemeGameTeamViewPageComponent,
        resolve: { [SchemeGameTeamViewPageConstants.RESOLVE_KEY]: SchemeGameTeamViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: []
    }
];
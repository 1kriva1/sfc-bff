import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildTitle } from "@core/utils";
import { PlayerConstants, TeamConstants } from "@share/constants";
import { Route } from "@share/enums";
import { RouteConstants } from "@core/constants";
import {
    RequestGamePlayerCreatePageComponent,
    RequestGamePlayerEditPageComponent,
    RequestGamePlayerEditPageConstants,
    RequestGamePlayerEditPageResolver,
    RequestGamePlayerViewPageComponent,
    RequestGamePlayerViewPageConstants,
    RequestGamePlayerViewPageResolver
} from "./pages";

export const RequestGamePlayerRoutes: Routes = [
    {
        path: `${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Players}/${RouteKey.Create}`,
        component: RequestGamePlayerCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle('Request game player'),
        children: []
    },
    // page/edit
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Players}/:${PlayerConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: RequestGamePlayerEditPageComponent,
        resolve: { [RequestGamePlayerEditPageConstants.RESOLVE_KEY]: RequestGamePlayerEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: []
    },
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Players}/:${PlayerConstants.ID_ROUTE_PATH}`,
        component: RequestGamePlayerViewPageComponent,
        resolve: { [RequestGamePlayerViewPageConstants.RESOLVE_KEY]: RequestGamePlayerViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: []
    },
];
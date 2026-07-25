import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildTitle } from "@core/utils";
import { TeamConstants } from "@share/constants";
import { Route } from "@share/enums";
import { RouteConstants } from "@core/constants";
import {
    RequestGameTeamCreatePageComponent,
    RequestGameTeamEditPageComponent,
    RequestGameTeamEditPageConstants,
    RequestGameTeamEditPageResolver,
    RequestGameTeamViewPageComponent,
    RequestGameTeamViewPageConstants,
    RequestGameTeamViewPageResolver
} from "./pages";

export const RequestGameTeamRoutes: Routes = [
    {
        path: `${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Teams}/${RouteKey.Create}`,
        component: RequestGameTeamCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle('Request game player'),
        children: []
    },
    // page/edit
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: RequestGameTeamEditPageComponent,
        resolve: { [RequestGameTeamEditPageConstants.RESOLVE_KEY]: RequestGameTeamEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: []
    },
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}`,
        component: RequestGameTeamViewPageComponent,
        resolve: { [RequestGameTeamViewPageConstants.RESOLVE_KEY]: RequestGameTeamViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: []
    },
];
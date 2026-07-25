import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildTitle } from "@core/utils";
import { PlayerConstants, TeamConstants } from "@share/constants";
import { Route } from "@share/enums";
import { RouteConstants } from "@core/constants";
import {
    InviteGamePlayerCreatePageComponent,
    InviteGamePlayerEditPageComponent,
    InviteGamePlayerEditPageConstants,
    InviteGamePlayerEditPageResolver,
    InviteGamePlayerViewPageComponent,
    InviteGamePlayerViewPageConstants,
    InviteGamePlayerViewPageResolver
} from "./pages";

export const InviteGamePlayerRoutes: Routes = [
    {
        path: `${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Players}/${RouteKey.Create}`,
        component: InviteGamePlayerCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle('Invite game player'),
        children: []
    },
    // page/edit
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Players}/:${PlayerConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: InviteGamePlayerEditPageComponent,
        resolve: { [InviteGamePlayerEditPageConstants.RESOLVE_KEY]: InviteGamePlayerEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: []
    },
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Players}/:${PlayerConstants.ID_ROUTE_PATH}`,
        component: InviteGamePlayerViewPageComponent,
        resolve: { [InviteGamePlayerViewPageConstants.RESOLVE_KEY]: InviteGamePlayerViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: []
    },
];
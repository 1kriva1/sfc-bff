import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildTitle } from "@core/utils";
import { TeamConstants } from "@share/constants";
import { Route } from "@share/enums";
import { RouteConstants } from "@core/constants";
import {
    InviteGameTeamCreatePageComponent,
    InviteGameTeamEditPageComponent,
    InviteGameTeamEditPageConstants,
    InviteGameTeamEditPageResolver,
    InviteGameTeamViewPageComponent,
    InviteGameTeamViewPageConstants,
    InviteGameTeamViewPageResolver
} from "./pages";

export const InviteGameTeamRoutes: Routes = [
    {
        path: `${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Teams}/${RouteKey.Create}`,
        component: InviteGameTeamCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle('Invite game player'),
        children: []
    },
    // page/edit
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: InviteGameTeamEditPageComponent,
        resolve: { [InviteGameTeamEditPageConstants.RESOLVE_KEY]: InviteGameTeamEditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        children: []
    },
    // page/view
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${Route.Games}/:${TeamConstants.ID_ROUTE_PATH}/${Route.Teams}/:${TeamConstants.ID_ROUTE_PATH}`,
        component: InviteGameTeamViewPageComponent,
        resolve: { [InviteGameTeamViewPageConstants.RESOLVE_KEY]: InviteGameTeamViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: []
    },
];
import { Routes } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildFallbackRoute, buildTitle } from "@core/utils";
import { PlayerConstants, TeamConstants } from "@share/constants";
import { PlayerRoute, TeamRoute } from "@share/enums";
import {
    InviteTeamPlayerProfileEditComponent, InviteTeamPlayerProfileEditRoute, InviteTeamPlayerProfileFootballEditComponent,
    InviteTeamPlayerProfileGeneralEditComponent
} from "./components";
import {
    InviteTeamPlayerCreatePageComponent, InviteTeamPlayerCreatePageConstants, InviteTeamPlayerCreatePageLocalization,
    InviteTeamPlayerCreatePageResolver, InviteTeamPlayerCreatePageRoute
} from "./pages/create";
import {
    InviteTeamPlayerEditPageComponent, InviteTeamPlayerEditPageConstants, InviteTeamPlayerEditPageResolver,
    InviteTeamPlayerEditPageRoute
} from "./pages/edit";
import {
    InviteTeamPlayerViewGeneralProfileComponent, InviteTeamPlayerViewPageComponent, InviteTeamPlayerViewPageConstants,
    InviteTeamPlayerViewPageResolver, InviteTeamPlayerViewPageRoute, InviteTeamPlayerViewProfileComponent,
    InviteTeamPlayerViewProfileRoute
} from "./pages/view";

export const InviteTeamPlayerRoutes: Routes = [
    {
        path: `${TeamRoute.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${PlayerRoute.Players}/${RouteKey.Create}`,
        component: InviteTeamPlayerCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        resolve: { [InviteTeamPlayerCreatePageConstants.RESOLVE_KEY]: InviteTeamPlayerCreatePageResolver },
        title: buildTitle(InviteTeamPlayerCreatePageLocalization.ROUTE.TITLE),
        children: [
            {
                path: InviteTeamPlayerCreatePageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: InviteTeamPlayerProfileEditComponent,
                children: [
                    {
                        path: InviteTeamPlayerProfileEditRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: InviteTeamPlayerProfileGeneralEditComponent
                    },
                    {
                        path: InviteTeamPlayerProfileEditRoute.Football,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: InviteTeamPlayerProfileFootballEditComponent
                    },
                    buildFallbackRoute(InviteTeamPlayerProfileEditRoute.General)
                ]
            },
            buildFallbackRoute(InviteTeamPlayerCreatePageRoute.Profile)
        ]
    },
    {
        path: `${TeamRoute.Teams}/${PlayerRoute.Players}/${RouteKey.Create}`,
        component: InviteTeamPlayerCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        resolve: { [InviteTeamPlayerCreatePageConstants.RESOLVE_KEY]: InviteTeamPlayerCreatePageResolver },
        title: buildTitle(InviteTeamPlayerCreatePageLocalization.ROUTE.TITLE),
        children: [
            {
                path: InviteTeamPlayerCreatePageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: InviteTeamPlayerProfileEditComponent,
                children: [
                    {
                        path: InviteTeamPlayerProfileEditRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: InviteTeamPlayerProfileGeneralEditComponent
                    },
                    {
                        path: InviteTeamPlayerProfileEditRoute.Football,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: InviteTeamPlayerProfileFootballEditComponent
                    },
                    buildFallbackRoute(InviteTeamPlayerProfileEditRoute.General)
                ]
            },
            buildFallbackRoute(InviteTeamPlayerCreatePageRoute.Profile)
        ]
    },
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${TeamRoute.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${PlayerRoute.Players}/:${PlayerConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: InviteTeamPlayerEditPageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        resolve: { [InviteTeamPlayerEditPageConstants.RESOLVE_KEY]: InviteTeamPlayerEditPageResolver },
        children: [
            {
                path: InviteTeamPlayerEditPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: InviteTeamPlayerProfileEditComponent,
                children: [
                    {
                        path: InviteTeamPlayerProfileEditRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: InviteTeamPlayerProfileGeneralEditComponent
                    },
                    {
                        path: InviteTeamPlayerProfileEditRoute.Football,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: InviteTeamPlayerProfileFootballEditComponent
                    },
                    buildFallbackRoute(InviteTeamPlayerProfileEditRoute.General)
                ]
            },
            buildFallbackRoute(InviteTeamPlayerEditPageRoute.Profile)
        ]
    },
    {
        path: `:${RouteConstants.ID_ROUTE_PATH}/${TeamRoute.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${PlayerRoute.Players}/:${PlayerConstants.ID_ROUTE_PATH}`,
        component: InviteTeamPlayerViewPageComponent,
        resolve: { [InviteTeamPlayerViewPageConstants.RESOLVE_KEY]: InviteTeamPlayerViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: [
            {
                path: InviteTeamPlayerViewPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: InviteTeamPlayerViewProfileComponent,
                children: [
                    {
                        path: InviteTeamPlayerViewProfileRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: InviteTeamPlayerViewGeneralProfileComponent
                    },
                    buildFallbackRoute(InviteTeamPlayerViewProfileRoute.General)
                ]
            },
            buildFallbackRoute(InviteTeamPlayerViewPageRoute.Profile)
        ]
    }
];
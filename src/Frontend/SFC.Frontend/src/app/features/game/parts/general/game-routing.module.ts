import { Routes } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CanActivateOnlyOneTimeAccess, CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile } from "@core/guards";
import { buildTitle } from "@core/utils";
import { GameCreatePageComponent, GameCreatePageConstants, GameCreatePageLocalization } from "./pages";
import { GameCreatePageRoute } from "./pages/create/game-create-page-route.enum";
import { LayoutConstants, RouteConstants } from "@core/constants";
import {
    GameFinalEditComponent,
    GameFinancialProfileEditComponent,
    GameGeneralProfileEditComponent,
    GameInventaryProfileEditComponent,
    GameProfileEditComponent,
    GameTeamsEditComponent
} from "./components";
import { GameProfileEditRoute } from "./components/edit/parts/profile/enums/game-profile-edit-route.enum";

export const GameRoutes: Routes = [
    // page/create
    {
        path: RouteKey.Create,
        component: GameCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        title: buildTitle(GameCreatePageLocalization.ROUTE.TITLE),
        children: [
            {
                path: GameCreatePageRoute.Teams,
                data: GameCreatePageConstants.DISABLED_AUTO_SCROLL_ROUTE_DATA,
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
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: GameProfileEditRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: GameCreatePageRoute.Final,
                component: GameFinalEditComponent,
                canActivate: [CanActivateOnlyOneTimeAccess],
                data: GameCreatePageConstants.ALLOW_ACCESS_ROUTE_DATA
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: GameCreatePageRoute.Teams,
                pathMatch: 'full'
            }
        ]
    }
];
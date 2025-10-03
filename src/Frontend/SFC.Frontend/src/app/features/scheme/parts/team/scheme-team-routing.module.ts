import { Routes } from "@angular/router";
import { LayoutConstants, RouteConstants } from "@core/constants";
import { RouteKey } from "@core/enums";
import { CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile, ChangesCheckGuard } from "@core/guards";
import { buildTitle } from "@core/utils";
import { SchemeConstants, TeamConstants } from "@share/constants";
import { TeamRoute } from "@share/enums";
import { SchemeTeamProfileEditComponent, SchemeTeamProfileGeneralEditComponent, SchemeTeamFormationEditComponent } from "./components";
import { SchemeTeamProfileEditRoute } from "./components/edit/profile/enums/scheme-team-profile-edit-route.enum";
import { SchemeTeamCreatePageLocalization } from "./pages/create/scheme-team-create-page-page.localization";
import { SchemeTeamCreatePageResolver } from "./pages/create/scheme-team-create-page-page.resolver";
import { SchemeTeamCreatePageRoute } from "./pages/create/scheme-team-create-page-route.enum";
import { SchemeTeamCreatePageComponent } from "./pages/create/scheme-team-create-page.component";
import { SchemeTeamCreatePageConstants } from "./pages/create/scheme-team-create-page.constants";
import { SchemeTeamEditPageRoute } from "./pages/edit/scheme-team-edit-page-route.enum";
import { SchemeTeamEditPageComponent } from "./pages/edit/scheme-team-edit-page.component";
import { SchemeTeamEditPageConstants } from "./pages/edit/scheme-team-edit-page.constants";
import { SchemeTeamEditPageResolver } from "./pages/edit/scheme-team-edit-page.resolver";
import { SchemeTeamViewGeneralProfileComponent } from "./pages/view/components/profile/parts/general/scheme-team-view-general-profile.component";
import { SchemeTeamViewProfileRoute } from "./pages/view/components/profile/scheme-team-view-profile-route.enum";
import { SchemeTeamViewProfileComponent } from "./pages/view/components/profile/scheme-team-view-profile.component";
import { SchemeTeamViewPageRoute } from "./pages/view/scheme-team-view-page-route.enum";
import { SchemeTeamViewPageComponent } from "./pages/view/scheme-team-view-page.component";
import { SchemeTeamViewPageConstants } from "./pages/view/scheme-team-view-page.constants";
import { SchemeTeamViewPageResolver } from "./pages/view/scheme-team-view-page.resolver";

export const SchemeTeamRoutes: Routes = [
    {
        path: `${TeamRoute.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Create}`,
        component: SchemeTeamCreatePageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        resolve: { [SchemeTeamCreatePageConstants.RESOLVE_KEY]: SchemeTeamCreatePageResolver },
        title: buildTitle(SchemeTeamCreatePageLocalization.ROUTE.TITLE),
        children: [
            {
                path: SchemeTeamCreatePageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeTeamProfileEditComponent,
                children: [
                    {
                        path: SchemeTeamProfileEditRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: SchemeTeamProfileGeneralEditComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: SchemeTeamProfileEditRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: SchemeTeamCreatePageRoute.Formation,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeTeamFormationEditComponent
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: SchemeTeamCreatePageRoute.Profile,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: `:${SchemeConstants.ID_ROUTE_PATH}/${TeamRoute.Teams}/:${TeamConstants.ID_ROUTE_PATH}/${RouteKey.Edit}`,
        component: SchemeTeamEditPageComponent,
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        canDeactivate: [ChangesCheckGuard],
        resolve: { [SchemeTeamEditPageConstants.RESOLVE_KEY]: SchemeTeamEditPageResolver },
        children: [
            {
                path: SchemeTeamEditPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeTeamProfileEditComponent,
                children: [
                    {
                        path: SchemeTeamProfileEditRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: SchemeTeamProfileGeneralEditComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: SchemeTeamProfileEditRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: SchemeTeamEditPageRoute.Formation,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeTeamFormationEditComponent
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: SchemeTeamEditPageRoute.Profile,
                pathMatch: 'full'
            }
        ]
    },
    {
        path: `:${SchemeConstants.ID_ROUTE_PATH}/${TeamRoute.Teams}/:${TeamConstants.ID_ROUTE_PATH}`,
        component: SchemeTeamViewPageComponent,
        resolve: { [SchemeTeamViewPageConstants.RESOLVE_KEY]: SchemeTeamViewPageResolver },
        canActivate: [CanMatchOnlyAuthenticated, CanMatchOnlyCreatedProfile],
        children: [
            {
                path: SchemeTeamViewPageRoute.Profile,
                data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                component: SchemeTeamViewProfileComponent,
                children: [
                    {
                        path: SchemeTeamViewProfileRoute.General,
                        data: { layout: LayoutConstants.ONLY_HEADER_LAYOUT_MODEL },
                        component: SchemeTeamViewGeneralProfileComponent
                    },
                    {
                        path: RouteConstants.DEFAULT_ROUTE_PATH,
                        redirectTo: SchemeTeamViewProfileRoute.General,
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: RouteConstants.DEFAULT_ROUTE_PATH,
                redirectTo: SchemeTeamViewPageRoute.Profile,
                pathMatch: 'full'
            }
        ]
    }
];
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "@core/constants";
import { RoutKey } from "@core/enums";
import { CreatePageComponent } from "./pages/create/create.page.component";
import { CreatePageLocalization } from "./pages/create/create.page.localization";
import { buildTitle } from '@core/utils';
import { EditPageComponent } from "./pages";
import { EditPageConstants } from "./pages/edit/edit.page.constants";
import { CanMatchOnlyAuthenticated, ChangesCheckGuard } from "@core/guards";
import { EditPageResolver } from "./pages/edit/resolver/edit.page.resolver";

const routes: Routes = [
    {
        path: RoutKey.Create,
        component: CreatePageComponent,
        title: buildTitle(CreatePageLocalization.ROUTER.TITLE.CREATE)
    },
    {
        path: `:id/${RoutKey.Edit}`,
        component: EditPageComponent,
        resolve: { [EditPageConstants.RESOLVE_KEY]: EditPageResolver },
        canActivate: [CanMatchOnlyAuthenticated],
        canDeactivate: [ChangesCheckGuard]
    },
    {
        path: RouteConstants.DEFAULT_ROUTE_PATH,
        redirectTo: RoutKey.Create,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule { }
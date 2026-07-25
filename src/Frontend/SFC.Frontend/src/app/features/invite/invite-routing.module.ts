import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "@core/constants";
import { InviteTeamRoutes } from "./parts/team";
import { InviteGameRoutes } from "./parts/game";

const routes: Routes = [
    ...InviteTeamRoutes,
    ...InviteGameRoutes,
    ...RouteConstants.DEFAULT_ROUTE_FALLBACK
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InviteRoutingModule { }
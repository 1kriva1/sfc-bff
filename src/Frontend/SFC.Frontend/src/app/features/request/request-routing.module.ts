import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "@core/constants";
import { RequestTeamRoutes } from "./parts/team";
import { RequestGameRoutes } from "./parts/game";

const routes: Routes = [
    ...RequestTeamRoutes,
    ...RequestGameRoutes,
    ...RouteConstants.DEFAULT_ROUTE_FALLBACK
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestRoutingModule { }
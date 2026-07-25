import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "@core/constants";
import { GameGeneralRoutes } from "./parts/general";
import { GamePlayerRoutes } from "./parts/player";
import { GameTeamRoutes } from "./parts/team";

const routes: Routes = [
    ...GameGeneralRoutes,
    ...GamePlayerRoutes,
    ...GameTeamRoutes,
    ...RouteConstants.DEFAULT_ROUTE_FALLBACK
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
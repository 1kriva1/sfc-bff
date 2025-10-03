import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "@core/constants";
import { TeamRoutes } from "./parts/general";
import { TeamPlayerRoutes } from "./parts/player";

const routes: Routes = [
    ...TeamRoutes,
    ...TeamPlayerRoutes,
    ...RouteConstants.DEFAULT_ROUTE_FALLBACK
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule { }
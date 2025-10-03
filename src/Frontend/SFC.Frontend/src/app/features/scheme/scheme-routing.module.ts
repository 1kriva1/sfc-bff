import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstants } from "@core/constants";
import { SchemeTeamRoutes } from "./parts/team";

const routes: Routes = [
    ...SchemeTeamRoutes,
    ...RouteConstants.DEFAULT_ROUTE_FALLBACK
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SchemeRoutingModule { }
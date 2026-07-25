import { Routes } from "@angular/router";
import { RequestGamePlayerRoutes } from "./player";
import { RequestGameTeamRoutes } from "./team";

export const RequestGameRoutes: Routes = [
    ...RequestGamePlayerRoutes,
    ...RequestGameTeamRoutes
];
import { Routes } from "@angular/router";
import { InviteGamePlayerRoutes } from "./player";
import { InviteGameTeamRoutes } from "./team";

export const InviteGameRoutes: Routes = [
    ...InviteGamePlayerRoutes,
    ...InviteGameTeamRoutes
];
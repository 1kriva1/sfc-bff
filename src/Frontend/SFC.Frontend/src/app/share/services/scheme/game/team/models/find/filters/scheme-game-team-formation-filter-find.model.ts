import { empty } from "ngx-sfc-common";
import { ISchemeGameTeamFormationPlayersFilterFindModel } from "./scheme-game-team-formation-players-filter-find.model";

export interface ISchemeGameTeamFormationFilterFindModel {
    Formation: number | empty;
    Players: ISchemeGameTeamFormationPlayersFilterFindModel | null;
}
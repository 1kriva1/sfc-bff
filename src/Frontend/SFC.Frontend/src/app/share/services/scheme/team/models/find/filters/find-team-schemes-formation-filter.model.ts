import { empty } from "ngx-sfc-common";
import { IFindTeamSchemesFormationPlayersFilterModel } from "./find-team-schemes-formation-players-filter.model";

export interface IFindTeamSchemesFormationFilterModel {
    Formation: number | empty;
    Players: IFindTeamSchemesFormationPlayersFilterModel | null;
}
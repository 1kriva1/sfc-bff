import { ILimitSearchModel } from "@core/models";

export interface ISchemeGameTeamFormationPlayersStatsFilterFindModel {
    Total: ILimitSearchModel<number> | null;
}

export interface ISchemeGameTeamFormationPlayersFilterFindModel {
    Stats: ISchemeGameTeamFormationPlayersStatsFilterFindModel | null;
}
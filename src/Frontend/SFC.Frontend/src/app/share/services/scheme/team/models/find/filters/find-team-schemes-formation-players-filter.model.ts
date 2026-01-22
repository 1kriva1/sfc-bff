import { ILimitSearchModel } from "@core/models";
import { empty } from "ngx-sfc-common";

export interface IFindTeamSchemesFormationPlayersStatsFilterModel {
    Total: ILimitSearchModel<number> | null;
}

export interface IFindTeamSchemesFormationPlayersFilterModel {
    Stats: IFindTeamSchemesFormationPlayersStatsFilterModel | null;
}
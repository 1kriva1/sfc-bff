import { empty } from "ngx-sfc-common";
import { IFindPlayersProfileFilterModel } from "./find-players-profile-filter.model";
import { IFindPlayersStatsFilterModel } from "./find-players-stats-filter.model";

export interface IFindPlayersFilterModel {
    ExcludeIds?: number[] | empty;
    Profile: IFindPlayersProfileFilterModel;
    Stats?: IFindPlayersStatsFilterModel | empty;
}
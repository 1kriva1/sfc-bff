import { IFindPlayersProfileFilterModel } from "./find-players-profile-filter.model";
import { IFindPlayersStatsFilterModel } from "./find-players-stats-filter.model";

export interface IFindPlayersFilterModel {
    Profile: IFindPlayersProfileFilterModel;
    Stats: IFindPlayersStatsFilterModel;
}
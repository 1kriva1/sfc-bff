import { IFootballFilterModel } from "../parts/football/football-filter.model";
import { IGeneralFilterModel } from "../parts/general/general-filter.model";
import { IStatsFilterModel } from "../parts/stats/stats-filter.model";

export interface IPlayersFilterModel {
    name: string | null;
    general: IGeneralFilterModel;
    football: IFootballFilterModel;
    stats: IStatsFilterModel;
}
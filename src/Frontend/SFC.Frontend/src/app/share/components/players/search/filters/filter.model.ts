import { IFootballFilterModel } from "./football/football-filter.model";
import { IGeneralFilterModel } from "./general/general-filter.model";
import { IStatsFilterModel } from "./stats/stats-filter.model";

export interface ISearchPlayersFilterModel {
    name: string | null;
    general: IGeneralFilterModel;
    football: IFootballFilterModel;
    stats: IStatsFilterModel;
}
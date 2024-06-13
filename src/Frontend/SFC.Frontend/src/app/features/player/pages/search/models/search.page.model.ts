import { IFootballFilterModel } from "../parts/filters/football/football-filter.model";
import { IGeneralFilterModel } from "../parts/filters/general/general-filter.model";
import { IStatsFilterModel } from "../parts/filters/stats/stats-filter.model";

export interface ISearchPageModel {
    name: string | null;
    general: IGeneralFilterModel;
    football: IFootballFilterModel;
    stats: IStatsFilterModel;
}
import { IFootballFilterModel, IGeneralFilterModel, IStatsFilterModel } from "@share/components/players/search/filters";

export interface ISearchPageModel {
    name: string | null;
    general: IGeneralFilterModel;
    football: IFootballFilterModel;
    stats: IStatsFilterModel;
}
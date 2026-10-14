import { empty } from "ngx-sfc-common";
import { IFootballFilterModel } from "../parts/football/football-filter.model";
import { IGeneralFilterModel } from "../parts/general/general-filter.model";
import { IStatsFilterModel } from "../parts/stats/stats-filter.model";

export interface IPlayersFilterModel {
    name: string | null;
    excludeIds?: number[] | empty;
    general?: IGeneralFilterModel;
    football?: IFootballFilterModel;
    stats?: IStatsFilterModel;
}
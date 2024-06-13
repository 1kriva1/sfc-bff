import { StatsValue } from "@share/types";

export interface IStatsProfilePointsModel {
    available: number;
    used: number;
}

export interface IStatsProfileModel {
    points: IStatsProfilePointsModel;
    value: StatsValue;
}
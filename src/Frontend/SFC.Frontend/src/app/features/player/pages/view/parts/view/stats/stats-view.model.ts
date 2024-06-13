import { IStatsMetadataModel, IStatsModel } from "@share/models";
import { StatsValue } from "@share/types";
import { ChartConfiguration } from "chart.js";

export interface IStatsViewChartModel {
    radar: { data: ChartConfiguration['data'] }
}

export interface IStatsViewModel {
    chart: IStatsViewChartModel,
    progress: number,
    total: number,
    value: number,
    model: IStatsModel[],
    metadata: { [key: string]: IStatsMetadataModel },
    stats: StatsValue;
}
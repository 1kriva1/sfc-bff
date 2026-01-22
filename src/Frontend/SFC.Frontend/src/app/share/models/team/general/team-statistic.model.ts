import { IStatisticModel } from "../../common";

export interface ITeamStatisticActivityValueModel {
    games: number;
    wins: number;
    loses: number;
    draws: number;
    goals: number;
    conceded: number;
    assists: number;
    penalties: number;
    cleanSheets: number;
    redCards: number;
    yellowCards: number;
}

export interface ITeamStatisticModel {
    statistic: IStatisticModel<ITeamStatisticActivityValueModel>[];
}
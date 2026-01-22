import { IStatisticEnumModel, IStatisticModel } from "../../common";

export interface ITeamGameStatisticValueModel {
    statuses: IStatisticEnumModel[];
}

export interface ITeamGameStatisticModel {
    statistic: IStatisticModel<ITeamGameStatisticValueModel>[];
}
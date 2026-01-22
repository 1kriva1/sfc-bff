import { IStatisticEnumModel, IStatisticModel } from "@share/models";

export interface ITeamPlayerStatisticValueModel {
    statuses: IStatisticEnumModel[];
    positions: IStatisticEnumModel[];
}

export interface ITeamPlayerStatisticModel {
    statistic: IStatisticModel<ITeamPlayerStatisticValueModel>[];
}
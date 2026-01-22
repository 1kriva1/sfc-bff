import { IStatisticEnumModel } from "@share/services/common/statistic/statistic-enum.model";

export interface ITeamPlayerStatisticValueModel {
    Statuses: IStatisticEnumModel[];
    Positions: IStatisticEnumModel[];
}
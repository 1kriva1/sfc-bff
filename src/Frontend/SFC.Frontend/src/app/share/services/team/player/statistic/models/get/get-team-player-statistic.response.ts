import { BaseErrorResponse, IIdServiceModel } from "@core/models";
import { IStatisticModel } from "@share/services/common/statistic/statistic.model";
import { ITeamPlayerStatisticValueModel } from "./team-player-statistic-value.model";

export interface IGetTeamPlayerStatisticResponse extends BaseErrorResponse {
    Team: IIdServiceModel;
    Statistic: IStatisticModel<ITeamPlayerStatisticValueModel>[];
}
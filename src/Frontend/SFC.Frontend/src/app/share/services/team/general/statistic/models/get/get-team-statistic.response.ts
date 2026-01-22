import { BaseErrorResponse, IIdServiceModel } from "@core/models";
import { IStatisticServiceModel } from "@share/services/common";
import { ITeamStatisticValueModel } from "./team-statistic-value.model";

export interface IGetTeamStatisticResponse extends BaseErrorResponse {
    Team: IIdServiceModel;
    Statistic: IStatisticServiceModel<ITeamStatisticValueModel>[];
}
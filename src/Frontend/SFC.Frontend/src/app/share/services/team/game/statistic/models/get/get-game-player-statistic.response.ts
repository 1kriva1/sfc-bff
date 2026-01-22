import { BaseErrorResponse, IIdServiceModel } from "@core/models";
import { IStatisticServiceModel } from "@share/services/common";
import { ITeamGameStatisticValueModel } from "./team-game-statistic-value.model";

export interface IGetTeamGameStatisticResponse extends BaseErrorResponse {
    Team: IIdServiceModel;
    Statistic: IStatisticServiceModel<ITeamGameStatisticValueModel>[];
}
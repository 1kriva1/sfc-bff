import { BaseErrorResponse } from "@core/models";
import { IDataValueModel } from "../../../data/models/common/data-value.model";

export interface IGetTeamDataResponse extends BaseErrorResponse {
    TeamStatuses: IDataValueModel[];
    TeamPlayerStatuses: IDataValueModel[];
}
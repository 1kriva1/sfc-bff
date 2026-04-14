import { BaseErrorResponse } from "@core/models";
import { IDataValueModel } from "../../../data/models/common/data-value.model";

export interface IGetGameDataResponse extends BaseErrorResponse {
    GameStatuses: IDataValueModel[];
}
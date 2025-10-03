import { BaseErrorResponse } from "@core/models";
import { IDataValueModel } from "../../../data/models/common/data-value.model";

export interface IGetRequestDataResponse extends BaseErrorResponse {
    RequestStatuses: IDataValueModel[];
}
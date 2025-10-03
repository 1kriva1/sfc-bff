import { BaseErrorResponse } from "@core/models";
import { IDataValueModel } from "../../../data/models/common/data-value.model";

export interface IGetInviteDataResponse extends BaseErrorResponse {
    InviteStatuses: IDataValueModel[];
}
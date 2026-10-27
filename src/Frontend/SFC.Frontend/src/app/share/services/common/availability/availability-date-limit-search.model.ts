import { ILimitSearchModel } from "@core/models";

export interface IAvailabilityDateLimitSearchModel extends ILimitSearchModel<string> {
    Date: string | null;
}
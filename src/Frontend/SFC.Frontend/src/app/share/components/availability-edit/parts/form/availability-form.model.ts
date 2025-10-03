import { ILimitModel } from "@core/models";
import { IValueModel } from "@core/types";

export interface IAvailabilityFormModel extends ILimitModel<Date> {
    days: IValueModel<number>[];
}
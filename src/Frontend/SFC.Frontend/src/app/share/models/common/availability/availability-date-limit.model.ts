import { ILimitModel } from "@core/models";

export interface IAvailabilityDateLimitModel extends ILimitModel<Date | null> {
    date: Date | null;
}
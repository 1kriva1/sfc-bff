import { ILimitModel } from "@core/models";

export interface IAvailabilityLimitModel extends ILimitModel<Date | null> {
    days: number[] | null;
}
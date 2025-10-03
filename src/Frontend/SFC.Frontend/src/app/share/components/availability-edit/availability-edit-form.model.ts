import { ILimitModel } from "@core/models";

export interface IAvailabilityEditFormModel
    extends ILimitModel<Date> {
    day: number;
}
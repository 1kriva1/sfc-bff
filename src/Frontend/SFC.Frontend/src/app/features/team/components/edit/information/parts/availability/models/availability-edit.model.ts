import { ILimitModel } from "@core/models";

export interface IAvailabilityEditModel
    extends ILimitModel<Date> {
    day: number;
}
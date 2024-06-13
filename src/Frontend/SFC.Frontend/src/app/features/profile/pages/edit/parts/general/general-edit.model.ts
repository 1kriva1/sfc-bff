import { ILimitModel } from "@core/models";
import { IValueModel } from "@core/types";

export interface IGeneralEditAvailabilityModel extends ILimitModel<Date | null> {
    days: IValueModel<number>[] | null;
}

export interface IGeneralEditModel {
    firstName: string;
    lastName: string;
    biography: string | null;
    birthday: Date | null;
    city: string;
    tags: string[] | null;
    freePlay: boolean;
    availability: IGeneralEditAvailabilityModel;
}
import { IRangeLimitValueModel } from "ngx-sfc-inputs";

export interface IGeneralFilterAvailabilityModel {
    days: number[] | null;
    from: Date | null;
    to: Date | null;
}

export interface IGeneralFilterModel {
    city: string | null;
    tags: string[] | null;
    years: IRangeLimitValueModel;
    availability: IGeneralFilterAvailabilityModel;
    freePlay: boolean;
    hasPhoto: boolean;
}
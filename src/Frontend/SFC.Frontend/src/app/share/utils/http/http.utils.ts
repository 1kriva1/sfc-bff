import { toEnglishLocaleTimeWithTwoDigitsString } from "@core/utils";
import { IAvailabilityEditFormModel } from "../../components/availability-edit/availability-edit-form.model";
import { IAvailabilityModel } from "../../services/common";
import { convertTimestampToDate, empty } from "ngx-sfc-common";
import { IRangeLimitValueModel } from "ngx-sfc-inputs";
import { ILimitSearchModel } from "@core/models";

export function mapAvailabilityModel(value: IAvailabilityEditFormModel): IAvailabilityModel {
    return {
        Day: value.day,
        From: toEnglishLocaleTimeWithTwoDigitsString(value.from),
        To: toEnglishLocaleTimeWithTwoDigitsString(value.to)
    };
}

export function mapAvailabilityEditFormModel(value: IAvailabilityModel): IAvailabilityEditFormModel {
    return {
        day: value.Day,
        from: convertTimestampToDate(value.From),
        to: convertTimestampToDate(value.To)
    };
}

export function mapLimitSearchModel(value: IRangeLimitValueModel | empty): ILimitSearchModel<number> | null {
    return value ? { From: value.from, To: value.to } : null;
}
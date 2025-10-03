import { toEnglishLocaleTimeWithTwoDigitsString } from "@core/utils";
import { IAvailabilityEditFormModel } from "../../components/availability-edit/availability-edit-form.model";
import { IAvailabilityModel } from "../../services/common";
import { convertTimestampToDate } from "ngx-sfc-common";

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

import { FormBuilder, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { Compare, nameof } from "ngx-sfc-common";
import { compareThan, maxArrayLength } from "ngx-sfc-inputs";
import { IGeneralFilterAvailabilityModel, IGeneralFilterModel } from "./general-filter.model";

export function buildPlayerSearchFilterGeneralFormControls(formBuilder: FormBuilder): IForm<IGeneralFilterModel> {
    const availabilityControls: IForm<IGeneralFilterAvailabilityModel> = {
        days: [null],
        from: [null, [compareThan(nameof<IGeneralFilterAvailabilityModel>('to'), Compare.Less)]],
        to: [null, [compareThan(nameof<IGeneralFilterAvailabilityModel>('from'), Compare.More, true)]]
    };
    
    return {
        city: [null, [Validators.maxLength(ValidationConstants.MAX_CITY_LENGTH)]],
        hasPhoto: [null],
        freePlay: [null],
        tags: [null, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]],
        years: [null],
        availability: formBuilder.group(availabilityControls)
    }
}
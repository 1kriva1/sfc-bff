import { FormBuilder, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { IAvailabilityLimitModel } from "@share/models";
import { Compare, nameof } from "ngx-sfc-common";
import { compareThan, maxArrayLength } from "ngx-sfc-inputs";
import { ITeamSearchFilterGeneralModel } from "./team-search-filter-general.model";

export function buildTeamSearchFilterGeneralFormGroup(formBuilder: FormBuilder): IForm<ITeamSearchFilterGeneralModel> {
    const availabilityControls: IForm<IAvailabilityLimitModel> = {
        days: [null],
        from: [null, [compareThan(nameof<IAvailabilityLimitModel>('to'), Compare.Less)]],
        to: [null, [compareThan(nameof<IAvailabilityLimitModel>('from'), Compare.More, true)]]
    };

    return {
        city: [null, [Validators.maxLength(ValidationConstants.MAX_CITY_LENGTH)]],
        statuses: [null],
        tags: [null, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]],
        availability: formBuilder.group(availabilityControls),
        hasLogo: [null],
        locationId: [null]
    }
}
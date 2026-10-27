import { FormBuilder, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { IAvailabilityDateLimitModel } from "@share/models";
import { Compare, nameof } from "ngx-sfc-common";
import { compareThan, maxArrayLength } from "ngx-sfc-inputs";
import { IGameSearchFilterGeneralModel } from "./game-search-filter-general.model";

export function buildGameSearchFilterGeneralFormControls(formBuilder: FormBuilder): IForm<IGameSearchFilterGeneralModel> {
    const availabilityControls: IForm<IAvailabilityDateLimitModel> = {
        date: [null],
        from: [null, [compareThan(nameof<IAvailabilityDateLimitModel>('to'), Compare.Less)]],
        to: [null, [compareThan(nameof<IAvailabilityDateLimitModel>('from'), Compare.More, true)]]
    };

    return {
        name: [null, [Validators.maxLength(ValidationConstants.MAX_NAME_LENGTH)]],
        statuses: [null],
        tags: [null, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]],
        availability: formBuilder.group(availabilityControls),
        location: [null]
    }
}
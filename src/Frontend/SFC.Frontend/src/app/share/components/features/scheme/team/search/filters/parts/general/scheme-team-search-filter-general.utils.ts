import { Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { ISchemeTeamSearchFilterGeneralModel } from "./scheme-team-search-filter-general.model";

export function buildSchemeTeamSearchFilterGeneralFormControls(): IForm<ISchemeTeamSearchFilterGeneralModel> {
    return {
        comment: [null, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]]
    }
}
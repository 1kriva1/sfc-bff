import { Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { ISchemeGameTeamSearchFilterGeneralModel } from "./scheme-game-team-search-filter-general.model";

export function buildSchemeGameTeamSearchFilterGeneralFormControls(): IForm<ISchemeGameTeamSearchFilterGeneralModel> {
    return {
        comment: [null, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]]
    }
}
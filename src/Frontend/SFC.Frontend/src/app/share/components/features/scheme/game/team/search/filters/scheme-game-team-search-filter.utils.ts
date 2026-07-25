import { IForm } from "@core/types";
import { buildPropertyPath, IPredicateMapModel, IPredicateMapParametersModel } from "@core/utils";
import { nameof } from "ngx-sfc-common";
import { ISchemeGameTeamSearchFilterModel } from "./scheme-game-team-search-filter.model";
import { TableConstants } from "@share/components/extends/components/table/table.constants";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SchemeGameTeamSearchFilterLocalization } from "./scheme-game-team-search-filter.localization";
import { ISchemeGameTeamSearchFilterGeneralModel } from "./parts/general/scheme-game-team-search-filter-general.model";
import { buildSchemeGameTeamSearchFilterGeneralFormControls } from "./parts/general/scheme-game-team-search-filter-general.utils";
import { ISchemeGameTeamSearchFilterFormationModel } from "./parts/formation/scheme-game-team-search-filter-formation.model";
import { buildSchemeGameTeamSearchFilterFormationFormControls } from "./parts/formation/scheme-game-team-search-filter-formation.utils";
import { SchemeGameTeamSearchFilterGeneralLocalization } from "./parts/general/scheme-game-team-search-filter-general.localization";
import { SchemeGameTeamSearchFilterFormationLocalization } from "./parts/formation/scheme-game-team-search-filter-formation.localization";
import { IRangeLimitValueModel } from "ngx-sfc-inputs";

export function mapSchemeGameTeamPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    switch (parameters.path) {
        case nameof<ISchemeGameTeamSearchFilterModel>('name'):
            return { label: SchemeGameTeamSearchFilterLocalization.INPUT.NAME.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<ISchemeGameTeamSearchFilterModel>('general'), nameof<ISchemeGameTeamSearchFilterGeneralModel>('comment')):
            return { label: SchemeGameTeamSearchFilterGeneralLocalization.INPUT.COMMENT.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<ISchemeGameTeamSearchFilterModel>('formation'), nameof<ISchemeGameTeamSearchFilterFormationModel>('formation')):
            return {
                label: SchemeGameTeamSearchFilterFormationLocalization.INPUT.FORMATION.LABEL,
                value: parameters.value.value
            };
        case buildPropertyPath(
            nameof<ISchemeGameTeamSearchFilterModel>('formation'),
            nameof<ISchemeGameTeamSearchFilterFormationModel>('raiting'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: SchemeGameTeamSearchFilterFormationLocalization.INPUT.RAITING.FILTERS_FROM_LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(
            nameof<ISchemeGameTeamSearchFilterModel>('formation'),
            nameof<ISchemeGameTeamSearchFilterFormationModel>('raiting'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: SchemeGameTeamSearchFilterFormationLocalization.INPUT.RAITING.FILTERS_TO_LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildSchemeGameTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const generalControls: IForm<ISchemeGameTeamSearchFilterGeneralModel> = buildSchemeGameTeamSearchFilterGeneralFormControls(),
        formationControls: IForm<ISchemeGameTeamSearchFilterFormationModel> = buildSchemeGameTeamSearchFilterFormationFormControls();

    const controls: IForm<ISchemeGameTeamSearchFilterModel> = {
        name: [null],
        general: formBuilder.group(generalControls),
        formation: formBuilder.group(formationControls)
    };

    return formBuilder.group(controls);
}


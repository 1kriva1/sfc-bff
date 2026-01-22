import { IForm } from "@core/types";
import { buildPropertyPath, IPredicateMapModel, IPredicateMapParametersModel } from "@core/utils";
import { nameof } from "ngx-sfc-common";
import { ISchemeTeamSearchFilterModel } from "./scheme-team-search-filter.model";
import { TableConstants } from "@share/components/extends/components/table/table.constants";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SchemeTeamSearchFilterLocalization } from "./scheme-team-search-filter.localization";
import { ISchemeTeamSearchFilterGeneralModel } from "./parts/general/scheme-team-search-filter-general.model";
import { buildSchemeTeamSearchFilterGeneralFormControls } from "./parts/general/scheme-team-search-filter-general.utils";
import { ISchemeTeamSearchFilterFormationModel } from "./parts/formation/scheme-team-search-filter-formation.model";
import { buildSchemeTeamSearchFilterFormationFormControls } from "./parts/formation/scheme-team-search-filter-formation.utils";
import { SchemeTeamSearchFilterGeneralLocalization } from "./parts/general/scheme-team-search-filter-general.localization";
import { SchemeTeamSearchFilterFormationLocalization } from "./parts/formation/scheme-team-search-filter-formation.localization";
import { IRangeLimitValueModel } from "ngx-sfc-inputs";

export function mapSchemeTeamPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    switch (parameters.path) {
        case nameof<ISchemeTeamSearchFilterModel>('name'):
            return { label: SchemeTeamSearchFilterLocalization.INPUT.NAME.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<ISchemeTeamSearchFilterModel>('general'), nameof<ISchemeTeamSearchFilterGeneralModel>('comment')):
            return { label: SchemeTeamSearchFilterGeneralLocalization.INPUT.COMMENT.LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(nameof<ISchemeTeamSearchFilterModel>('formation'), nameof<ISchemeTeamSearchFilterFormationModel>('formation')):
            return {
                label: SchemeTeamSearchFilterFormationLocalization.INPUT.FORMATION.LABEL,
                value: parameters.value.value
            };
        case buildPropertyPath(
            nameof<ISchemeTeamSearchFilterModel>('formation'),
            nameof<ISchemeTeamSearchFilterFormationModel>('raiting'),
            nameof<IRangeLimitValueModel>('from')
        ):
            return { label: SchemeTeamSearchFilterFormationLocalization.INPUT.RAITING.FILTERS_FROM_LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        case buildPropertyPath(
            nameof<ISchemeTeamSearchFilterModel>('formation'),
            nameof<ISchemeTeamSearchFilterFormationModel>('raiting'),
            nameof<IRangeLimitValueModel>('to')
        ):
            return { label: SchemeTeamSearchFilterFormationLocalization.INPUT.RAITING.FILTERS_TO_LABEL, debounce: TableConstants.SEARCH_DEBOUNCE_TIME };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildSchemeTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const generalControls: IForm<ISchemeTeamSearchFilterGeneralModel> = buildSchemeTeamSearchFilterGeneralFormControls(),
        formationControls: IForm<ISchemeTeamSearchFilterFormationModel> = buildSchemeTeamSearchFilterFormationFormControls();

    const controls: IForm<ISchemeTeamSearchFilterModel> = {
        name: [null],
        general: formBuilder.group(generalControls),
        formation: formBuilder.group(formationControls)
    };

    return formBuilder.group(controls);
}


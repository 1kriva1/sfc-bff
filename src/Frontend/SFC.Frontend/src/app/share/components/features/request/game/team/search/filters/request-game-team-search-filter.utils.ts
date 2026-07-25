import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IRequestGameTeamSearchFilterModel } from "./request-game-team-search-filter.model";
import { IRequestGameTeamSearchFilterGeneralModel } from "./parts/general/request-game-team-search-filter-general.model";
import { RequestGameTeamSearchFlterGeneralLocalization } from "./parts/general/request-game-team-search-filter-general.localization";
import { buildRequestGameTeamSearchFilterGeneralFormControls } from "./parts/general/request-game-team-search-filter-general.utils";
import { IRequestGameTeamFilterModel } from "./parts/request-game-team-filter.model";
import { buildTeamSearchFilterFormControls, ITeamSearchFilterModel, mapTeamPredicateMapModel } from "@share/components/features/team";

export function mapRequestGameTeamPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IRequestGameTeamSearchFilterModel>('team'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapTeamPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        case buildPropertyPath(
            nameof<IRequestGameTeamSearchFilterModel>('request'),
            nameof<IRequestGameTeamFilterModel>('general'),
            nameof<IRequestGameTeamSearchFilterGeneralModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.requestStatuses)!;
                return {
                    label: RequestGameTeamSearchFlterGeneralLocalization.INPUT.STATUSES.LABEL,
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildRequestGameTeamFilterFormControls(formBuilder: FormBuilder): IForm<IRequestGameTeamFilterModel> {
    const generalControls: IForm<IRequestGameTeamSearchFilterGeneralModel> = buildRequestGameTeamSearchFilterGeneralFormControls();

    return {
        general: formBuilder.group(generalControls)
    };
}

export function buildRequestGameTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const requestControls: IForm<IRequestGameTeamFilterModel> = buildRequestGameTeamFilterFormControls(formBuilder),
        teamControls: IForm<ITeamSearchFilterModel> = buildTeamSearchFilterFormControls(formBuilder);

    const controls: IForm<IRequestGameTeamSearchFilterModel> = {
        team: formBuilder.group(teamControls),
        request: formBuilder.group(requestControls)
    };

    return formBuilder.group(controls);
}


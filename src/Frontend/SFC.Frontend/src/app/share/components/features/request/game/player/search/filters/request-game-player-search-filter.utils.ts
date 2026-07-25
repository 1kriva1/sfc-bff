import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildPlayerSearchFilterFormControls, mapPlayerPredicateMapModel } from "@share/components/features/player/search/filters/player-search-filter.utils";
import { IPlayersFilterModel } from "@share/components/features/player";
import { IRequestGamePlayerSearchFilterModel } from "./request-game-player-search-filter.model";
import { IRequestGamePlayerSearchFilterGeneralModel } from "./parts/general/request-game-player-search-filter-general.model";
import { RequestGamePlayerSearchFlterGeneralLocalization } from "./parts/general/request-game-player-search-filter-general.localization";
import { buildRequestGamePlayerSearchFilterGeneralFormControls } from "./parts/general/request-game-player-search-filter-general.utils";
import { IRequestGamePlayerFilterModel } from "./parts/request-game-player-filter.model";

export function mapRequestGamePlayerPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IRequestGamePlayerSearchFilterModel>('player'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapPlayerPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        case buildPropertyPath(
            nameof<IRequestGamePlayerSearchFilterModel>('request'),
            nameof<IRequestGamePlayerFilterModel>('general'),
            nameof<IRequestGamePlayerSearchFilterGeneralModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.requestStatuses)!;
                return {
                    label: RequestGamePlayerSearchFlterGeneralLocalization.INPUT.STATUSES.LABEL,
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildRequestGamePlayerFilterFormControls(formBuilder: FormBuilder): IForm<IRequestGamePlayerFilterModel> {
    const generalControls: IForm<IRequestGamePlayerSearchFilterGeneralModel> = buildRequestGamePlayerSearchFilterGeneralFormControls();

    return {
        general: formBuilder.group(generalControls)
    };
}

export function buildRequestGamePlayerSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const requestControls: IForm<IRequestGamePlayerFilterModel> = buildRequestGamePlayerFilterFormControls(formBuilder),
        playerControls: IForm<IPlayersFilterModel> = buildPlayerSearchFilterFormControls(formBuilder);

    const controls: IForm<IRequestGamePlayerSearchFilterModel> = {
        player: formBuilder.group(playerControls),
        request: formBuilder.group(requestControls)
    };

    return formBuilder.group(controls);
}


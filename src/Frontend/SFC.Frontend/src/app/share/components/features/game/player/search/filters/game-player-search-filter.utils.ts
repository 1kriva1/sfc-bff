import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildPlayerSearchFilterFormControls, mapPlayerPredicateMapModel } from "@share/components/features/player/search/filters/player-search-filter.utils";
import { IPlayersFilterModel } from "@share/components/features/player";
import { IGamePlayerSearchFilterModel } from "./game-player-search-filter.model";
import { IGamePlayerSearchFilterGeneralModel } from "./parts/general/game-player-search-filter-general.model";
import { GamePlayerSearchFlterGeneralLocalization } from "./parts/general/game-player-search-filter-general.localization";
import { buildGamePlayerSearchFilterGeneralFormControls } from "./parts/general/game-player-search-filter-general.utils";
import { IGamePlayerFilterModel } from "./parts/game-player-filter.model";

export function mapGamePlayerPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IGamePlayerSearchFilterModel>('player'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapPlayerPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        case buildPropertyPath(
            nameof<IGamePlayerSearchFilterModel>('gamePlayer'),
            nameof<IGamePlayerFilterModel>('general'),
            nameof<IGamePlayerSearchFilterGeneralModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.gamePlayerStatuses)!;
                return {
                    label: GamePlayerSearchFlterGeneralLocalization.INPUT.STATUSES.LABEL,
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildGamePlayerFilterFormControls(formBuilder: FormBuilder): IForm<IGamePlayerFilterModel> {
    const generalControls: IForm<IGamePlayerSearchFilterGeneralModel> = buildGamePlayerSearchFilterGeneralFormControls();

    return {
        general: formBuilder.group(generalControls)
    };
}

export function buildGamePlayerSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const gamePlayersControls: IForm<IGamePlayerFilterModel> = buildGamePlayerFilterFormControls(formBuilder),
        playerControls: IForm<IPlayersFilterModel> = buildPlayerSearchFilterFormControls(formBuilder);

    const controls: IForm<IGamePlayerSearchFilterModel> = {
        player: formBuilder.group(playerControls),
        gamePlayer: formBuilder.group(gamePlayersControls)
    };

    return formBuilder.group(controls);
}
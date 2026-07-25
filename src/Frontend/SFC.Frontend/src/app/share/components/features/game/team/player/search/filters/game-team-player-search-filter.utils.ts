import { IForm } from "@core/types";
import { getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildPlayerSearchFilterFormControls, mapPlayerPredicateMapModel } from "@share/components/features/player/search/filters/player-search-filter.utils";
import { IPlayersFilterModel } from "@share/components/features/player";
import { IGameTeamPlayerSearchFilterModel } from "./game-team-player-search-filter.model";
import { IGameTeamPlayerSearchFilterGeneralModel } from "./parts/general/game-team-player-search-filter-general.model";
import { buildGameTeamPlayerSearchFilterGeneralFormControls } from "./parts/general/game-team-player-search-filter-general.utils";
import { IGameTeamPlayerFilterModel } from "./parts/game-team-player-filter.model";

export function mapGameTeamPlayerPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IGameTeamPlayerSearchFilterModel>('player'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapPlayerPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildGameTeamPlayerFilterFormControls(formBuilder: FormBuilder): IForm<IGameTeamPlayerFilterModel> {
    const generalControls: IForm<IGameTeamPlayerSearchFilterGeneralModel> = buildGameTeamPlayerSearchFilterGeneralFormControls();

    return {
        general: formBuilder.group(generalControls)
    };
}

export function buildGameTeamPlayerSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const gamePlayersControls: IForm<IGameTeamPlayerFilterModel> = buildGameTeamPlayerFilterFormControls(formBuilder),
        playerControls: IForm<IPlayersFilterModel> = buildPlayerSearchFilterFormControls(formBuilder);

    const controls: IForm<IGameTeamPlayerSearchFilterModel> = {
        player: formBuilder.group(playerControls),
        gameTeamPlayer: formBuilder.group(gamePlayersControls)
    };

    return formBuilder.group(controls);
}
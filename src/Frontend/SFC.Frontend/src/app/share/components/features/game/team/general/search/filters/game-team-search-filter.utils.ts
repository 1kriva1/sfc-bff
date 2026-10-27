import { IForm } from "@core/types";
import { buildPropertyPath, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IGameTeamFilterModel } from "./models/game-team-filter.model";
import { buildTeamSearchFilterFormControls, mapTeamPredicateMapModel } from "@share/components/features/team/general/search/filters/team-search-filter.utils";
import { ITeamSearchFilterModel } from "@share/components/features/team/general/search/filters/team-search-filter.model";
import { IGameTeamSearchFilterModel } from "./models/game-team-search-filter.model";
import { getEnum } from "@share/utils";
import { IEnumModel } from "@share/models";

export function mapGameTeamPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IGameTeamSearchFilterModel>('team'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapTeamPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        case buildPropertyPath(
            nameof<IGameTeamSearchFilterModel>('gameTeam'),
            nameof<IGameTeamFilterModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.gameTeamStatuses)!;
                return {
                    label: 'Statuses',
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildGameTeamFilterFormControls(model?: IGameTeamFilterModel): IForm<IGameTeamFilterModel> {
    return {
        statuses: [model?.statuses],
    };
}

export function buildGameTeamSearchFilterFormGroup(formBuilder: FormBuilder, model?: IGameTeamSearchFilterModel): FormGroup {
    const gameTeamControls: IForm<IGameTeamFilterModel> = buildGameTeamFilterFormControls(model?.gameTeam),
        teamControls: IForm<ITeamSearchFilterModel> = buildTeamSearchFilterFormControls(formBuilder);

    const controls: IForm<IGameTeamSearchFilterModel> = {
        team: formBuilder.group(teamControls),
        gameTeam: formBuilder.group(gameTeamControls)
    };

    return formBuilder.group(controls);
}


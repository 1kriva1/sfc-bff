import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildTeamPlayerSearchFilterGeneralFormControls } from "./parts/general/team-player-search-filter-general.utils";
import { ITeamPlayerSearchFilterGeneralModel } from "./parts/general/team-player-search-filter-general.model";
import { ITeamPlayerSearchFilterModel } from "./models/team-player-search-filter.model";
import { buildPlayerSearchFilterFormControls, mapPlayerPredicateMapModel } from "@share/components/features/player/search/filters/player-search-filter.utils";
import { IPlayersFilterModel } from "@share/components/features/player";
import { ITeamPlayerFilterModel } from "./models/team-player-filter.model";
import { TeamPlayerSearchFlterGeneralLocalization } from "./parts/general/team-player-search-filter-general.localization";

export function mapTeamPlayerPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<ITeamPlayerSearchFilterModel>('player'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapPlayerPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        case buildPropertyPath(
            nameof<ITeamPlayerSearchFilterModel>('teamPlayer'),
            nameof<ITeamPlayerFilterModel>('general'),
            nameof<ITeamPlayerSearchFilterGeneralModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.teamPlayerStatuses)!;
                return {
                    label: TeamPlayerSearchFlterGeneralLocalization.INPUT.STATUSES.LABEL,
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildTeamPlayerFilterFormControls(formBuilder: FormBuilder): IForm<ITeamPlayerFilterModel> {
    const generalControls: IForm<ITeamPlayerSearchFilterGeneralModel> = buildTeamPlayerSearchFilterGeneralFormControls();

    return {
        general: formBuilder.group(generalControls)
    };
}

export function buildTeamPlayerSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const teamPlayerControls: IForm<ITeamPlayerFilterModel> = buildTeamPlayerFilterFormControls(formBuilder),
        playerControls: IForm<IPlayersFilterModel> = buildPlayerSearchFilterFormControls(formBuilder);

    const controls: IForm<ITeamPlayerSearchFilterModel> = {
        name: [null],
        player: formBuilder.group(playerControls),
        teamPlayer: formBuilder.group(teamPlayerControls)
    };

    return formBuilder.group(controls);
}


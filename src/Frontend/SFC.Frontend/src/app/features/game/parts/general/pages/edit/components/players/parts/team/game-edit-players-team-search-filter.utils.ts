import { getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { IPlayersFilterModel, mapTeamPlayerPredicateMapModel } from "@share/components";
import { IGameEditPlayersTeamSearchFilterModel } from "./game-edit-players-team-search-filter.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { buildPlayerSearchFilterFormControls } from "@share/components/features/player/search/filters";
import { ITeamPlayerFilterModel } from "@share/components/features/team/players/search/filters/models/team-player-filter.model";
import { buildTeamPlayerFilterFormControls } from "@share/components/features/team/players/search/filters/team-player-search-filter.utils";

export function buildGameEditPlayersTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const teamPlayersControls: IForm<ITeamPlayerFilterModel> = buildTeamPlayerFilterFormControls(formBuilder),
        playerControls: IForm<IPlayersFilterModel> = buildPlayerSearchFilterFormControls(formBuilder);

    const controls: IForm<IGameEditPlayersTeamSearchFilterModel> = {
        player: formBuilder.group(playerControls),
        teamPlayer: formBuilder.group(teamPlayersControls),
        team: [null]
    };

    return formBuilder.group(controls);
}

export function mapGameEditPlayersTeamPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IGameEditPlayersTeamSearchFilterModel>('team'): {
            return {
                label: 'Team',
                value: parameters.value.value
            }
        }
    }

    return mapTeamPlayerPredicateMapModel(parameters);
}
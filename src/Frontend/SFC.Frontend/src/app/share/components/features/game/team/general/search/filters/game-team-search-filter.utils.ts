import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { IGameTeamSearchFilterFinancialModel } from "./parts/financial/game-team-search-filter-financial.model";
import { GameTeamSearchFilterGeneralLocalization } from "./parts/general/game-team-search-filter-general.localization";
import { IGameTeamSearchFilterGeneralModel } from "./parts/general/game-team-search-filter-general.model";
import { IGameTeamSearchFilterInventaryModel } from "./parts/inventary/game-team-search-filter-inventary.model";
import { IGameTeamSearchFilterModel } from "./game-team-search-filter.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildGameTeamSearchFilterGeneralFormControls } from "./parts/general/game-team-search-filter-general.utils";
import { buildGameTeamSearchFilterFinancialFormControls } from "./parts/financial/game-team-search-filter-financial.utils";
import { buildGameTeamSearchFilterInventaryFormControls } from "./parts/inventary/game-team-search-filter-inventary.utils";
import { IGameTeamFilterModel } from "./parts/game-team-filter.model";
import { buildTeamSearchFilterFormControls, mapTeamPredicateMapModel } from "@share/components/features/team/general/search/filters/team-search-filter.utils";
import { ITeamSearchFilterModel } from "@share/components/features/team/general/search/filters/team-search-filter.model";

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
            nameof<IGameTeamFilterModel>('general'),
            nameof<IGameTeamSearchFilterGeneralModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.gameTeamStatuses)!;
                return {
                    label: GameTeamSearchFilterGeneralLocalization.INPUT.STATUSES.LABEL,
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildGameTeamFilterFormControls(formBuilder: FormBuilder): IForm<IGameTeamFilterModel> {
    const generalControls: IForm<IGameTeamSearchFilterGeneralModel> = buildGameTeamSearchFilterGeneralFormControls(formBuilder),
        financialControls: IForm<IGameTeamSearchFilterFinancialModel> = buildGameTeamSearchFilterFinancialFormControls(),
        inventaryControls: IForm<IGameTeamSearchFilterInventaryModel> = buildGameTeamSearchFilterInventaryFormControls();

    return {
        general: formBuilder.group(generalControls),
        financial: formBuilder.group(financialControls),
        inventary: formBuilder.group(inventaryControls)
    };
}

export function buildGameTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const gameTeamControls: IForm<IGameTeamFilterModel> = buildGameTeamFilterFormControls(formBuilder),
        teamControls: IForm<ITeamSearchFilterModel> = buildTeamSearchFilterFormControls(formBuilder);

    const controls: IForm<IGameTeamSearchFilterModel> = {
        team: formBuilder.group(teamControls),
        gameTeam: formBuilder.group(gameTeamControls)
    };

    return formBuilder.group(controls);
}


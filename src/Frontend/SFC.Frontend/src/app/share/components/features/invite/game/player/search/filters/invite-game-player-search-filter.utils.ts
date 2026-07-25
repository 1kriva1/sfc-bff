import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { buildPlayerSearchFilterFormControls, mapPlayerPredicateMapModel } from "@share/components/features/player/search/filters/player-search-filter.utils";
import { IPlayersFilterModel } from "@share/components/features/player";
import { IInviteGamePlayerSearchFilterModel } from "./invite-game-player-search-filter.model";
import { IInviteGamePlayerSearchFilterGeneralModel } from "./parts/general/invite-game-player-search-filter-general.model";
import { InviteGamePlayerSearchFlterGeneralLocalization } from "./parts/general/invite-game-player-search-filter-general.localization";
import { buildInviteGamePlayerSearchFilterGeneralFormControls } from "./parts/general/invite-game-player-search-filter-general.utils";
import { IInviteGamePlayerFilterModel } from "./parts/invite-game-player-filter.model";

export function mapInviteGamePlayerPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IInviteGamePlayerSearchFilterModel>('player'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapPlayerPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        case buildPropertyPath(
            nameof<IInviteGamePlayerSearchFilterModel>('invite'),
            nameof<IInviteGamePlayerFilterModel>('general'),
            nameof<IInviteGamePlayerSearchFilterGeneralModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.inviteStatuses)!;
                return {
                    label: InviteGamePlayerSearchFlterGeneralLocalization.INPUT.STATUSES.LABEL,
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildInviteGamePlayerFilterFormControls(formBuilder: FormBuilder): IForm<IInviteGamePlayerFilterModel> {
    const generalControls: IForm<IInviteGamePlayerSearchFilterGeneralModel> = buildInviteGamePlayerSearchFilterGeneralFormControls();

    return {
        general: formBuilder.group(generalControls)
    };
}

export function buildInviteGamePlayerSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const inviteControls: IForm<IInviteGamePlayerFilterModel> = buildInviteGamePlayerFilterFormControls(formBuilder),
        playerControls: IForm<IPlayersFilterModel> = buildPlayerSearchFilterFormControls(formBuilder);

    const controls: IForm<IInviteGamePlayerSearchFilterModel> = {
        player: formBuilder.group(playerControls),
        invite: formBuilder.group(inviteControls)
    };

    return formBuilder.group(controls);
}


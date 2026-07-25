import { IEnumModel, IForm } from "@core/types";
import { buildPropertyPath, getEnum, getPropertyPartByIndex, IPredicateMapModel, IPredicateMapParametersModel, removePropertyPart } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IInviteGameTeamSearchFilterModel } from "./invite-game-team-search-filter.model";
import { IInviteGameTeamSearchFilterGeneralModel } from "./parts/general/invite-game-team-search-filter-general.model";
import { InviteGameTeamSearchFlterGeneralLocalization } from "./parts/general/invite-game-team-search-filter-general.localization";
import { buildInviteGameTeamSearchFilterGeneralFormControls } from "./parts/general/invite-game-team-search-filter-general.utils";
import { IInviteGameTeamFilterModel } from "./parts/invite-game-team-filter.model";
import { buildTeamSearchFilterFormControls, ITeamSearchFilterModel, mapTeamPredicateMapModel } from "@share/components/features/team";

export function mapInviteGameTeamPredicateMapModel(parameters: IPredicateMapParametersModel): IPredicateMapModel {
    const filtersPart: string | empty = getPropertyPartByIndex(parameters.path);

    switch (filtersPart) {
        case nameof<IInviteGameTeamSearchFilterModel>('team'): {
            parameters.path = removePropertyPart(parameters.path, filtersPart!);
            return mapTeamPredicateMapModel(parameters);
        }
    }

    switch (parameters.path) {
        case buildPropertyPath(
            nameof<IInviteGameTeamSearchFilterModel>('invite'),
            nameof<IInviteGameTeamFilterModel>('general'),
            nameof<IInviteGameTeamSearchFilterGeneralModel>('statuses')
        ): {
                const statusEnum: IEnumModel<number> = getEnum(parameters.value, parameters.enums!.inviteStatuses)!;
                return {
                    label: InviteGameTeamSearchFlterGeneralLocalization.INPUT.STATUSES.LABEL,
                    value: statusEnum.value,
                    icon: statusEnum.icon
                }
            };
        default: return { label: parameters.key, value: parameters.value, debounce: null }
    }
}

export function buildInviteGameTeamFilterFormControls(formBuilder: FormBuilder): IForm<IInviteGameTeamFilterModel> {
    const generalControls: IForm<IInviteGameTeamSearchFilterGeneralModel> = buildInviteGameTeamSearchFilterGeneralFormControls();

    return {
        general: formBuilder.group(generalControls)
    };
}

export function buildInviteGameTeamSearchFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const inviteControls: IForm<IInviteGameTeamFilterModel> = buildInviteGameTeamFilterFormControls(formBuilder),
        teamControls: IForm<ITeamSearchFilterModel> = buildTeamSearchFilterFormControls(formBuilder);

    const controls: IForm<IInviteGameTeamSearchFilterModel> = {
        team: formBuilder.group(teamControls),
        invite: formBuilder.group(inviteControls)
    };

    return formBuilder.group(controls);
}


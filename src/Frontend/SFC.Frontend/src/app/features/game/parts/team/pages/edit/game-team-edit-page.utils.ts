import { buildPropertyPath } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormGroup } from "@angular/forms";
import { IGameTeamEditFormModel } from "../../components/edit/game-team-edit-form.model";
import { IGameTeamProfileEditFormModel } from "../../components/edit/parts/profile/game-team-profile-edit-form.model";

export function isMenuItemInvalid(form: FormGroup, id: string): boolean | empty {
    switch (id) {
        case buildPropertyPath(nameof<IGameTeamEditFormModel>('profile'), nameof<IGameTeamProfileEditFormModel>('general')):
            return form.get(buildPropertyPath(
                nameof<IGameTeamEditFormModel>('profile'),
                nameof<IGameTeamProfileEditFormModel>('general'))
            )?.invalid;
        case buildPropertyPath(nameof<IGameTeamEditFormModel>('profile'), nameof<IGameTeamProfileEditFormModel>('inventary')):
            return form.get(buildPropertyPath(
                nameof<IGameTeamEditFormModel>('profile'),
                nameof<IGameTeamProfileEditFormModel>('inventary'))
            )?.invalid;
        default:
            return false;
    }
}
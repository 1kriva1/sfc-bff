import { buildPropertyPath } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { FormGroup } from "@angular/forms";
import { ISchemeGameTeamEditFormModel } from "../../components/edit/scheme-game-team-edit-form.model";
import { ISchemeGameTeamProfileEditFormModel } from "../../components/edit/parts/profile/scheme-game-team-profile-edit-form.model";

export function isMenuItemInvalid(form: FormGroup, id: string): boolean | empty {
    switch (id) {
        case buildPropertyPath(nameof<ISchemeGameTeamEditFormModel>('profile'), nameof<ISchemeGameTeamProfileEditFormModel>('general')):
            return form.get(buildPropertyPath(
                nameof<ISchemeGameTeamEditFormModel>('profile'),
                nameof<ISchemeGameTeamProfileEditFormModel>('general'))
            )?.invalid;
        default:
            return false;
    }
}
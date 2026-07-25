import { buildPropertyPath } from "@core/utils";
import { empty, nameof } from "ngx-sfc-common";
import { IGameEditPageFormModel } from "./models/game-edit-page-form.model";
import { IGameProfileEditFormModel } from "../../components/edit/parts/profile/game-profile-edit-form.model";
import { FormGroup } from "@angular/forms";

export function isMenuItemInvalid(form: FormGroup, id: string): boolean | empty {
    switch (id) {
        case buildPropertyPath(nameof<IGameEditPageFormModel>('profile'), nameof<IGameProfileEditFormModel>('general')):
            return form.get(buildPropertyPath(
                nameof<IGameEditPageFormModel>('profile'),
                nameof<IGameProfileEditFormModel>('general'))
            )?.invalid;
        case buildPropertyPath(nameof<IGameEditPageFormModel>('profile'), nameof<IGameProfileEditFormModel>('inventary')):
            return form.get(buildPropertyPath(
                nameof<IGameEditPageFormModel>('profile'),
                nameof<IGameProfileEditFormModel>('inventary'))
            )?.invalid;
        case buildPropertyPath(nameof<IGameEditPageFormModel>('profile'), nameof<IGameProfileEditFormModel>('financial')):
            return form.get(buildPropertyPath(
                nameof<IGameEditPageFormModel>('profile'),
                nameof<IGameProfileEditFormModel>('financial'))
            )?.invalid;
        default:
            return false;
    }
}
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { nameof } from "ngx-sfc-common";
import { GameProfileEditPart } from "../../enums/game-profile-edit-part.enum";
import { getFormGroup } from "@core/utils";
import { IGameEditFormModel } from "../../../../game-edit-form.model";
import { IGameInventaryProfileEditFormModel } from "./game-inventary-profile-edit-form.model";
import { addConditionalValidator } from "ngx-sfc-inputs";
import { GameInventaryProfileEditConstants } from "./game-inventary-profile-edit.constants";
import { IGameProfileEditFormModel } from "../../game-profile-edit-form.model";

export function addGameInventaryProfileEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const controls: IForm<IGameInventaryProfileEditFormModel> = {
        shirtsRequired: [null],
        shirtsCount: [0],
    };

    const formGroup: FormGroup = formBuilder.group(controls),
        profileForm: FormGroup = getFormGroup(nameof<IGameEditFormModel>('profile'), form.controls)!;

    profileForm.addControl(GameProfileEditPart.Inventary, formGroup);

    const inventaryProfileForm: FormGroup = getFormGroup(nameof<IGameProfileEditFormModel>('inventary'), profileForm)!;

    addConditionalValidator(
        inventaryProfileForm,
        nameof<IGameInventaryProfileEditFormModel>('shirtsCount'),
        nameof<IGameInventaryProfileEditFormModel>('shirtsRequired'),
        (value) => value,
        [
            Validators.required,
            Validators.min(GameInventaryProfileEditConstants.MIN_SHIRTS_COUNT),
            Validators.max(GameInventaryProfileEditConstants.MAX_SHIRTS_COUNT)
        ]
    );
}
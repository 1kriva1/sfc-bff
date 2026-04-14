import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { nameof, Compare, CommonConstants } from "ngx-sfc-common";
import { compareThan, maxArrayLength } from "ngx-sfc-inputs";
import { GameProfileEditPart } from "../../enums/game-profile-edit-part.enum";
import { IGameGeneralProfileEditFormModel } from "./game-general-profile-edit-form.model";
import { getFormGroup } from "@core/utils";
import { IGameEditFormModel } from "../../../../game-edit-form.model";

export function addGameGeneralProfileEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const controls: IForm<IGameGeneralProfileEditFormModel> = {
        name: [null, [Validators.required, Validators.maxLength(ValidationConstants.MAX_NAME_LENGTH)]],
        description: [CommonConstants.EMPTY_STRING, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]],
        tags: [null, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]],
        date: [null, [Validators.required]],
        from: [null, [Validators.required, compareThan(nameof<IGameGeneralProfileEditFormModel>('to'), Compare.Less, true)]],
        to: [null, [Validators.required, compareThan(nameof<IGameGeneralProfileEditFormModel>('from'), Compare.More, true)]],
        stadium: [null],
    };

    const formGroup: FormGroup = formBuilder.group(controls),
        profileForm: FormGroup = getFormGroup(nameof<IGameEditFormModel>('profile'), form.controls)!

    profileForm.addControl(GameProfileEditPart.General, formGroup);
}
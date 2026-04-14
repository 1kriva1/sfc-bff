import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { nameof } from "ngx-sfc-common";
import { GameProfileEditPart } from "../../enums/game-profile-edit-part.enum";
import { getFormGroup } from "@core/utils";
import { IGameEditFormModel } from "../../../../game-edit-form.model";
import { IGameFinancialProfileEditFormModel } from "./game-financial-profile-edit-form.model";
import { GameFinancialProfileEditConstants } from "./game-financial-profile-edit.constants";
import { addConditionalValidator } from "ngx-sfc-inputs";
import { IGameProfileEditFormModel } from "../../game-profile-edit-form.model";

export function addGameFinancialProfileEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const controls: IForm<IGameFinancialProfileEditFormModel> = {
        freeGame: [null],
        payAmount: [0],
    };

    const formGroup: FormGroup = formBuilder.group(controls),
        profileForm: FormGroup = getFormGroup(nameof<IGameEditFormModel>('profile'), form.controls)!

    profileForm.addControl(GameProfileEditPart.Financial, formGroup);

    const financialProfileForm: FormGroup = getFormGroup(nameof<IGameProfileEditFormModel>('financial'), profileForm)!;

    addConditionalValidator(
        financialProfileForm,
        nameof<IGameFinancialProfileEditFormModel>('payAmount'),
        nameof<IGameFinancialProfileEditFormModel>('freeGame'),
        (value) => !value,
        [
            Validators.required,
            Validators.min(GameFinancialProfileEditConstants.MIN_PAY_AMOUNT)
        ]
    );
}
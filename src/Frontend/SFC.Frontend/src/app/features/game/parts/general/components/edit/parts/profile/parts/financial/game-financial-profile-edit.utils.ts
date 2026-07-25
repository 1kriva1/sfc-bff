import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { nameof, empty } from "ngx-sfc-common";
import { GameProfileEditPart } from "../../enums/game-profile-edit-part.enum";
import { getFormGroup } from "@core/utils";
import { IGameFinancialProfileEditFormModel } from "./game-financial-profile-edit-form.model";
import { GameFinancialProfileEditConstants } from "./game-financial-profile-edit.constants";
import { addConditionalValidator } from "ngx-sfc-inputs";
import { IGameProfileEditFormModel } from "../../game-profile-edit-form.model";
import { IGameProfileModel } from "@share/models";
import { IGameEditFormModel } from "../../../../game-edit-form.model";

export function addGameFinancialProfileEditControl(formBuilder: FormBuilder, form: FormGroup, model: IGameProfileModel | empty = null): void {
    const formModel: IGameFinancialProfileEditFormModel = mapGameFinancialProfileEditFormModel(model);

    const controls: IForm<IGameFinancialProfileEditFormModel> = {
        freeGame: [formModel.freeGame],
        payAmount: [formModel.payAmount],
    };

    const financialProfileFormGroup: FormGroup = formBuilder.group(controls),
        profileForm: FormGroup = getFormGroup(nameof<IGameEditFormModel>('profile'), form.controls)!

    profileForm.addControl(GameProfileEditPart.Financial, financialProfileFormGroup);

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

function mapGameFinancialProfileEditFormModel(model: IGameProfileModel | empty = null): IGameFinancialProfileEditFormModel {
    return {
        freeGame: model?.financial.freeGame!,
        payAmount: model?.financial.payAmount
    };
}
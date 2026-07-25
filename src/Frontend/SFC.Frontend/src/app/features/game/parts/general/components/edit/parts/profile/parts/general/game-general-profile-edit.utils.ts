import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { nameof, Compare, empty, convertTimestampToDate } from "ngx-sfc-common";
import { compareThan, maxArrayLength } from "ngx-sfc-inputs";
import { GameProfileEditPart } from "../../enums/game-profile-edit-part.enum";
import { IGameGeneralProfileEditFormModel } from "./game-general-profile-edit-form.model";
import { getFormGroup } from "@core/utils";
import { IGameProfileModel } from "@share/models";
import { IGameEditFormModel } from "../../../../game-edit-form.model";

export function addGameGeneralProfileEditControl(formBuilder: FormBuilder, form: FormGroup, model: IGameProfileModel | empty = null): void {
    const formModel: IGameGeneralProfileEditFormModel = mapGameGeneralProfileEditFormModel(model);

    const controls: IForm<IGameGeneralProfileEditFormModel> = {
        name: [formModel.name, [Validators.required, Validators.maxLength(ValidationConstants.MAX_NAME_LENGTH)]],
        description: [formModel.description, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]],
        tags: [formModel.tags, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]],
        date: [formModel.date, [Validators.required]],
        from: [formModel.from, [Validators.required, compareThan(nameof<IGameGeneralProfileEditFormModel>('to'), Compare.Less, true)]],
        to: [formModel.to, [Validators.required, compareThan(nameof<IGameGeneralProfileEditFormModel>('from'), Compare.More, true)]],
        stadium: [formModel.stadium],
    };

    const profileForm: FormGroup = getFormGroup(nameof<IGameEditFormModel>('profile'), form.controls)!,
        generalProfileFormGroup: FormGroup = formBuilder.group(controls);

    profileForm.addControl(GameProfileEditPart.General, generalProfileFormGroup);
}

function mapGameGeneralProfileEditFormModel(model: IGameProfileModel | empty = null): IGameGeneralProfileEditFormModel {
    return {
        name: model?.general.name!,
        description: model?.general.description,
        tags: model?.general.tags,
        date: model?.general.date!,
        from: model ? convertTimestampToDate(model.general.from) : null!,
        to: model ? convertTimestampToDate(model.general.to!) : null!,
        stadium: model?.general.stadium
    };
}
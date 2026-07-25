import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { nameof, empty } from "ngx-sfc-common";
import { buildPath, getFormGroup } from "@core/utils";
import { RouteKey } from "@core/enums";
import { Route } from "@share/enums";
import { ISchemeGameTeamGeneralProfileEditFormModel } from "./scheme-game-team-general-profile-edit-form.model";
import { SchemeGameTeamProfileEditPart } from "../../enums/scheme-game-team-profile-edit-part.enum";
import { SchemeGameTeamProfileEditRoute } from "../../enums/scheme-game-team-profile-edit-route.enum";
import { SchemeGameTeamEditRoute } from "../../../../enums/scheme-game-team-edit-route.enum";
import { SchemeGameTeamGeneralProfileEditConstants } from "./scheme-game-team-general-profile-edit.constants";
import { IFormProgressParameters } from "@share/components";
import { ISchemeGameTeamProfileModel } from "@share/models";
import { ISchemeGameTeamEditFormModel } from "../../../../scheme-game-team-edit-form.model";

export function addSchemeGameTeamGeneralProfileEditControl(formBuilder: FormBuilder, form: FormGroup, model: ISchemeGameTeamProfileModel | empty = null): void {
    const formModel: ISchemeGameTeamGeneralProfileEditFormModel = mapSchemeGameTeamGeneralProfileEditFormModel(model);

    const controls: IForm<ISchemeGameTeamGeneralProfileEditFormModel> = {
        name: [formModel.name, [Validators.required, Validators.maxLength(ValidationConstants.MAX_NAME_LENGTH)]],
        comment: [formModel.comment, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]]
    };

    const generalProfileForm: FormGroup = formBuilder.group(controls),
        profileForm: FormGroup = getFormGroup(nameof<ISchemeGameTeamEditFormModel>('profile'), form.controls)!

    profileForm.addControl(SchemeGameTeamProfileEditPart.General, generalProfileForm);
}

export function getSchemeGameTeamGeneralProfileProgressParameters(gameId: number, teamId: number): IFormProgressParameters {
    return {
        key: SchemeGameTeamGeneralProfileEditConstants.ProgressKey,
        url: buildPath(`${Route.Schemes}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}/${RouteKey.Create}/${SchemeGameTeamEditRoute.Profile}/${SchemeGameTeamProfileEditRoute.General}`)
    };
}

function mapSchemeGameTeamGeneralProfileEditFormModel(model: ISchemeGameTeamProfileModel | empty = null): ISchemeGameTeamGeneralProfileEditFormModel {
    return {
        name: model?.general.name!,
        comment: model?.general.comment
    };
}
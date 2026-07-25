import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { nameof, empty } from "ngx-sfc-common";
import { fileMaxSize, maxArrayLength } from "ngx-sfc-inputs";
import { buildPath, convertFileFromBase64StringAsync, getFormGroup } from "@core/utils";
import { IGameTeamGeneralProfileEditFormModel } from "./game-team-general-profile-edit-form.model";
import { IGameTeamEditFormModel } from "../../../../game-team-edit-form.model";
import { GameTeamProfileEditPart } from "../../enums/game-team-profile-edit-part.enum";
import { RouteKey } from "@core/enums";
import { Route } from "@share/enums";
import { GameTeamProfileEditRoute } from "../../enums/game-team-profile-edit-route.enum";
import { ITeamProfileModel } from "@share/models";
import { GameTeamEditRoute } from "../../../../enums/game-team-edit-route.enum";
import { IFormProgressParameters } from "@share/components";
import { GameTeamGeneralProfileEditConstants } from "./game-team-general-profile-edit.constants";

export async function addGameTeamGeneralProfileEditControlAsync(formBuilder: FormBuilder, form: FormGroup, model: ITeamProfileModel | empty = null): Promise<void> {
    const formModel: IGameTeamGeneralProfileEditFormModel = await mapGameTeamGeneralProfileEditFormModelAsync(model);

    const controls: IForm<IGameTeamGeneralProfileEditFormModel> = {
        name: [formModel.name, [Validators.required, Validators.maxLength(ValidationConstants.MAX_NAME_LENGTH)]],
        logo: [formModel.logo, fileMaxSize(ValidationConstants.MAX_IMAGE_SIZE)],
        description: [formModel.description, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]],
        tags: [formModel.tags, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]]
    };

    const generalProfileFormGroup: FormGroup = formBuilder.group(controls),
        profileFormGroup: FormGroup = getFormGroup(nameof<IGameTeamEditFormModel>('profile'), form.controls)!

    profileFormGroup.addControl(GameTeamProfileEditPart.General, generalProfileFormGroup);
}

export function getGameTeamGeneralProfileProgressParameters(gameId: number): IFormProgressParameters {
    return {
        key: GameTeamGeneralProfileEditConstants.ProgressKey,
        url: buildPath(`${Route.Games}/${gameId}/${Route.Teams}/${RouteKey.Create}/${GameTeamEditRoute.Profile}/${GameTeamProfileEditRoute.General}`)
    };
}

async function mapGameTeamGeneralProfileEditFormModelAsync(model: ITeamProfileModel | empty = null): Promise<IGameTeamGeneralProfileEditFormModel> {
    return {
        name: model?.general.name!,
        logo: await convertFileFromBase64StringAsync(model?.general.logo),
        description: model?.general.description,
        tags: model?.general.tags,
    };
}
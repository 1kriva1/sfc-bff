import { FormBuilder, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { ValidationConstants } from "@share/constants";
import { fileMaxSize } from "ngx-sfc-inputs";
import { IGameTeamEditMainFormModel } from "./models/game-team-edit-main-edit-form.model";
import { GameTeamEditPageEditPart } from "../../game-team-edit-page-edit-part.enum";
import { IGameTeamEditPageModel } from "../../../../models/game-team-edit-page.model";
import { convertFileFromBase64StringAsync } from "@core/utils";

export async function addGameTeamEditMainControlAsync(formBuilder: FormBuilder, form: FormGroup, model: IGameTeamEditPageModel): Promise<void> {
    const formModel: IGameTeamEditMainFormModel = await mapGameTeamEditMainFormModelAsync(model);

    const controls: IForm<IGameTeamEditMainFormModel> = {
        logo: [formModel.logo, fileMaxSize(ValidationConstants.MAX_IMAGE_SIZE)]
    };
    const mainFormGroup: FormGroup = formBuilder.group(controls);

    form.addControl(GameTeamEditPageEditPart.Main, mainFormGroup);
}

async function mapGameTeamEditMainFormModelAsync(model: IGameTeamEditPageModel): Promise<IGameTeamEditMainFormModel> {
    return {
        logo: await convertFileFromBase64StringAsync(model.gameTeam.gameTeam.team!.profile.general.logo)
    };
}
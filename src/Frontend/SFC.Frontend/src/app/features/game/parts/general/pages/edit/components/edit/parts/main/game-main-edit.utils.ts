import { FormBuilder, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { nameof, Compare } from "ngx-sfc-common";
import { compareThan } from "ngx-sfc-inputs";
import { IGameMainEditFormModel } from "./game-main-edit-form.model";
import { GameEditPageEditPart } from "../../game-edit-page-edit-part.enum";
import { IGameEditPageModel } from "../../../../models/game-edit-page.model";

export function addGameMainEditControl(formBuilder: FormBuilder, form: FormGroup, model: IGameEditPageModel): void {
    const formModel: IGameMainEditFormModel = mapGameMainEditFormModel(model);

    const controls: IForm<IGameMainEditFormModel> = {
        teamAId: [formModel.teamAId, [compareThan(nameof<IGameMainEditFormModel>('teamBId'), Compare.NotEqual, true)]],
        teamBId: [formModel.teamBId, [compareThan(nameof<IGameMainEditFormModel>('teamAId'), Compare.NotEqual, true)]]
    };

    const mainFormGroup: FormGroup = formBuilder.group(controls);

    form.addControl(GameEditPageEditPart.Main, mainFormGroup);
}

function mapGameMainEditFormModel(model: IGameEditPageModel): IGameMainEditFormModel {
    return {
        teamAId: model.gameTeam.a?.gameTeam.id!,
        teamBId: model.gameTeam.b?.gameTeam.id!
    };
}
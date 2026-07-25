import { FormBuilder, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { nameof, Compare } from "ngx-sfc-common";
import { compareThan } from "ngx-sfc-inputs";
import { IGameTeamsEditFormModel } from "./game-teams-edit-form.model";
import { GameCreatePageEditPart } from "../../game-create-page-edit-part.enum";

export function addGameTeamsEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const controls: IForm<IGameTeamsEditFormModel> = {
        teamAId: [null, [compareThan(nameof<IGameTeamsEditFormModel>('teamBId'), Compare.NotEqual, true)]],
        teamBId: [null, [compareThan(nameof<IGameTeamsEditFormModel>('teamAId'), Compare.NotEqual, true)]]
    };
    const teamsFormGroup: FormGroup = formBuilder.group(controls);

    form.addControl(GameCreatePageEditPart.Teams, teamsFormGroup); 
}
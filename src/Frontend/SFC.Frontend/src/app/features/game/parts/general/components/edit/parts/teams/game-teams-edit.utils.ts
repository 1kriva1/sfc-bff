import { FormBuilder, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { nameof, Compare } from "ngx-sfc-common";
import { compareThan } from "ngx-sfc-inputs";
import { GameEditPart } from "../../game-edit-part.enum";
import { IGameTeamsEditFormModel } from "./game-teams-edit-form.model";

export function addGameTeamsEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const controls: IForm<IGameTeamsEditFormModel> = {
        teamAId: [null, [compareThan(nameof<IGameTeamsEditFormModel>('teamBId'), Compare.NotEqual, true)]],
        teamBId: [null, [compareThan(nameof<IGameTeamsEditFormModel>('teamAId'), Compare.NotEqual, true)]]
    };
    const formGroup: FormGroup = formBuilder.group(controls);

    form.addControl(GameEditPart.Teams, formGroup);
}
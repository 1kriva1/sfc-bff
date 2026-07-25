import { FormBuilder, FormGroup } from "@angular/forms";
import { GameTeamEditPart } from "../../enums/game-team-edit-part.enum";

export function addGameTeamProfileEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const profileEditFormGroup: FormGroup = formBuilder.group({});
    form.addControl(GameTeamEditPart.Profile, profileEditFormGroup);
}
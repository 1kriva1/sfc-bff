import { FormBuilder, FormGroup } from "@angular/forms";
import { SchemeGameTeamEditPart } from "../../enums/scheme-game-team-edit-part.enum";

export function addSchemeGameTeamProfileEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const profileEditFormGroup: FormGroup = formBuilder.group({});
    form.addControl(SchemeGameTeamEditPart.Profile, profileEditFormGroup);
}
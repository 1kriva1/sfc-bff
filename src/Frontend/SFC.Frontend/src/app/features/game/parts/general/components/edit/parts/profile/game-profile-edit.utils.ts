import { FormBuilder, FormGroup } from "@angular/forms";
import { GameEditPart } from "../../enums/game-edit-part.enum";

export function addGameProfileEditControl(formBuilder: FormBuilder, form: FormGroup): void {
    const profileEditFormGroup: FormGroup = formBuilder.group({});
    form.addControl(GameEditPart.Profile, profileEditFormGroup);
}
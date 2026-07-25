import { FormBuilder, FormGroup } from "@angular/forms";
import { IGameTeamPlayersFilterFormModel } from "./game-team-players-filter-form.model";
import { IForm } from "@core/types";

export function buildGameTeamPlayersFilterFormGroup(formBuilder: FormBuilder): FormGroup {
    const controls: IForm<IGameTeamPlayersFilterFormModel> = {
        name: [null]
    };

    return formBuilder.group(controls);
}
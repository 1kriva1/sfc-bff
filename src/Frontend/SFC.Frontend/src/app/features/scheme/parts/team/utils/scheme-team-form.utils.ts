import { AbstractControl, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { getControl, getFormGroup } from "@core/utils";
import { ISchemeTeamFormationPlayerModel } from "@share/models/scheme/scheme-team.model";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { getFormationEnum } from "@share/utils/formations";
import { empty, firstOrDefault, nameof } from "ngx-sfc-common";
import { Observable, startWith, map } from "rxjs";
import { ISchemeTeamFormationPlayerEditFieldFormModel } from "../components/edit/formation/parts/field/models/scheme-team-formation-edit-field-form.model";
import { ISchemeTeamFormationEditFormModel } from "../components/edit/formation/scheme-team-formation-edit-form.model";

export function getFormationControl(controls: any): AbstractControl | empty {
    const formationFormGroup: FormGroup = getFormGroup(nameof<ISchemeTeamFormationEditFormModel>('formation'), controls)!;
    return getControl(nameof<ISchemeTeamFormationEditFormModel>('formation'), formationFormGroup.controls);
}

export function getFormationControlChanges(controls: any, formations: IFormationEnumModel[]): Observable<IFormationEnumModel> {
    const formationControl: AbstractControl | empty = getFormationControl(controls);

    if (!formationControl) {
        throw new Error(`Formation control is missing.`)
    }

    return formationControl.valueChanges.pipe(
        startWith(formationControl.value),
        map((value: number) => getFormationEnum(value, formations)!)
    );
}

export function buildSchemeTeamFormationPlayerEditFieldFormModels(formation: IFormationEnumModel, players: ISchemeTeamFormationPlayerModel[])
    : IForm<ISchemeTeamFormationPlayerEditFieldFormModel[]> {
    const result: ISchemeTeamFormationPlayerEditFieldFormModel[] = [];

    formation.value.forEach((formationPositionLine: number[]) => {
        formationPositionLine.forEach((formationPositionId: number, index: number) => {
            const selectedSchemePlayer: ISchemeTeamFormationPlayerModel | empty = firstOrDefault(players,
                item => item.position.formationPosition.key === formationPositionId && item.position.index === index),
                schemePlayer: ISchemeTeamFormationPlayerEditFieldFormModel = {
                    position: { index: index, formationPosition: formationPositionId },
                    player: selectedSchemePlayer?.player?.id || null
                };

            result.push(schemePlayer);
        })
    });

    return result;
}
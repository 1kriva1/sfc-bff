import { AbstractControl, FormGroup } from "@angular/forms";
import { IForm } from "@core/types";
import { getControl, getFormGroup } from "@core/utils";
import { empty, firstOrDefault, nameof } from "ngx-sfc-common";
import { Observable, startWith, map } from "rxjs";
import { ISchemeFormationPlayerEditFieldFormModel } from "./parts/field/models/scheme-formation-edit-field-form.model";
import { ISchemeEditFormModel } from "../../scheme-edit-form.model";
import { IFormationEnumModel } from "@share/services";
import { getFormationEnum } from "@share/utils";
import { ISchemeTeamFormationPlayerModel } from "@share/models";

export function getFormationControl(controls: any): AbstractControl | empty {
    const formationFormGroup: FormGroup = getFormGroup(nameof<ISchemeEditFormModel>('formation'), controls)!;
    return getControl(nameof<ISchemeEditFormModel>('formation'), formationFormGroup.controls);
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
    : IForm<ISchemeFormationPlayerEditFieldFormModel[]> {
    const result: ISchemeFormationPlayerEditFieldFormModel[] = [];

    formation.value.forEach((formationPositionLine: number[]) => {
        formationPositionLine.forEach((formationPositionId: number, index: number) => {
            const selectedSchemePlayer: ISchemeTeamFormationPlayerModel | empty = firstOrDefault(players,
                item => item.position.formationPosition.key === formationPositionId && item.position.index === index),
                schemePlayer: ISchemeFormationPlayerEditFieldFormModel = {
                    position: { index: index, formationPosition: formationPositionId },
                    player: selectedSchemePlayer?.player?.id || null
                };

            result.push(schemePlayer);
        })
    });

    return result;
}
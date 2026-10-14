import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { empty, firstOrDefault, nameof } from "ngx-sfc-common";
import { buildPath, getControl, getFormGroup } from "@core/utils";
import { RouteKey } from "@core/enums";
import { Route } from "@share/enums";
import { ISchemeGameTeamFormationEditFormModel } from "./scheme-game-team-formation-edit-form.model";
import { SchemeGameTeamEditPart } from "../../enums/scheme-game-team-edit-part.enum";
import { getFormationEnum, mapSelectItems } from "@share/utils";
import { ISelectItemModel } from "ngx-sfc-inputs";
import { EnumService, IFormationEnumModel } from "@share/services";
import { IFormProgressParameters } from "@share/components";
import { SchemeGameTeamFormationEditConstants } from "./scheme-game-team-formation-edit.constants";
import { SchemeGameTeamEditRoute } from "../../enums/scheme-game-team-edit-route.enum";
import { ISchemeGameTeamFormationPlayerModel, ISchemeGameTeamModel } from "@share/models";
import { ISchemeGameTeamFormationPlayerEditFieldFormModel } from "./parts/field/models/scheme-game-team-formation-edit-field-form.model";
import { SchemeGameTeamFormationEditPart } from "./scheme-game-team-formation-edit-part.enum";
import { ISchemeGameTeamEditFormModel } from "../../scheme-game-team-edit-form.model";
import { map, Observable, startWith } from "rxjs";

export function getFormationControl(controls: any): AbstractControl | empty {
    const formationFormGroup: FormGroup = getFormGroup(nameof<ISchemeGameTeamEditFormModel>('formation'), controls)!;
    return getControl(nameof<ISchemeGameTeamEditFormModel>('formation'), formationFormGroup.controls);
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

export function addSchemeGameTeamFormationEditControl(formBuilder: FormBuilder, form: FormGroup, enumService: EnumService, model: ISchemeGameTeamModel | empty = null): void {
    const formModel: ISchemeGameTeamFormationEditFormModel = mapSchemeGameTeamFormationEditFormModel(enumService, model);

    const formationEditControls: IForm<ISchemeGameTeamFormationEditFormModel> = {
        formation: [formModel.formation, [Validators.required]],
        type: [formModel.type]
    };
    const formationEditFormGroup: FormGroup = formBuilder.group(formationEditControls);

    const players: ISchemeGameTeamFormationPlayerEditFieldFormModel[] = mapSchemeGameTeamFormationPlayerEditFieldFormModels(enumService, model);
    const fieldEditFormGroup: FormGroup = formBuilder.group({ players: formBuilder.array(players) });

    formationEditFormGroup.addControl(SchemeGameTeamFormationEditPart.Field, fieldEditFormGroup);

    form.addControl(SchemeGameTeamEditPart.Formation, formationEditFormGroup);
}

export function getSchemeGameTeamFormationProgressParameters(gameId: number, teamId: number): IFormProgressParameters {
    return {
        key: SchemeGameTeamFormationEditConstants.ProgressKey,
        url: buildPath(`${Route.Schemes}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}/${RouteKey.Create}/${SchemeGameTeamEditRoute.Formation}`)
    };
}

function mapSchemeGameTeamFormationEditFormModel(enumService: EnumService, model: ISchemeGameTeamModel | empty = null): ISchemeGameTeamFormationEditFormModel {
    const typeData: ISelectItemModel[] = mapSelectItems(enumService.enums.formationType),
        formationId: number = model?.formation.formationId
            ? getFormationEnum(model.formation.formationId, enumService.enums.formations)!.key
            : enumService.enums.formations[0].key;

    return {
        formation: formationId,
        type: typeData[0]
    } as ISchemeGameTeamFormationEditFormModel;
}

export function buildSchemeGameTeamFormationPlayerEditFieldFormModels(formation: IFormationEnumModel, players: ISchemeGameTeamFormationPlayerModel[])
    : IForm<ISchemeGameTeamFormationPlayerEditFieldFormModel[]> {
    const result: ISchemeGameTeamFormationPlayerEditFieldFormModel[] = [];

    formation.value.forEach((formationPositionLine: number[]) => {
        formationPositionLine.forEach((formationPositionId: number, index: number) => {
            const selectedSchemePlayer: ISchemeGameTeamFormationPlayerModel | empty = firstOrDefault(players,
                item => item.position.formationPosition.key === formationPositionId && item.position.index === index),
                schemePlayer: ISchemeGameTeamFormationPlayerEditFieldFormModel = {
                    position: { index: index, formationPosition: formationPositionId },
                    gameTeamPlayerId: selectedSchemePlayer?.gameTeamPlayer?.gameTeamPlayer?.id || null
                };

            result.push(schemePlayer);
        })
    });

    return result;
}

function mapSchemeGameTeamFormationPlayerEditFieldFormModels(enumService: EnumService, model: ISchemeGameTeamModel | empty = null): ISchemeGameTeamFormationPlayerEditFieldFormModel[] {
    const formationId: number = model?.formation.formationId
        ? getFormationEnum(model.formation.formationId, enumService.enums.formations)!.key
        : enumService.enums.formations[0].key,
        formation: IFormationEnumModel = firstOrDefault(enumService.enums.formations, (formation: IFormationEnumModel) => formation.key === formationId)!;

    return buildSchemeGameTeamFormationPlayerEditFieldFormModels(formation, model?.formation.players || [])
}
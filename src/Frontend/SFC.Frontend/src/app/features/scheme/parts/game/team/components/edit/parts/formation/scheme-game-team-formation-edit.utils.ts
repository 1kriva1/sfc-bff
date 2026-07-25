import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { empty, firstOrDefault } from "ngx-sfc-common";
import { buildPath } from "@core/utils";
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
import { ISchemeGameTeamModel } from "@share/models";
import { ISchemeFormationPlayerEditFieldFormModel } from "../../../../../../../components/edit/parts/formation/parts/field/models/scheme-formation-edit-field-form.model";
import { buildSchemeTeamFormationPlayerEditFieldFormModels } from "../../../../../../../components/edit/parts/formation/scheme-formation-edit.utils";
import { SchemeFormationEditPart } from "../../../../../../../components/edit/parts/formation/scheme-formation-edit-part.enum";

export function addSchemeGameTeamFormationEditControl(formBuilder: FormBuilder, form: FormGroup, enumService: EnumService, model: ISchemeGameTeamModel | empty = null): void {
    const formModel: ISchemeGameTeamFormationEditFormModel = mapSchemeGameTeamFormationEditFormModel(enumService, model);

    const formationEditControls: IForm<ISchemeGameTeamFormationEditFormModel> = {
        formation: [formModel.formation, [Validators.required]],
        type: [formModel.type]
    };
    const formationEditFormGroup: FormGroup = formBuilder.group(formationEditControls);

    const players: ISchemeFormationPlayerEditFieldFormModel[] = mapSchemeTeamFormationPlayerEditFieldFormModels(enumService, model);
    const fieldEditFormGroup: FormGroup = formBuilder.group({ players: formBuilder.array(players) });

    formationEditFormGroup.addControl(SchemeFormationEditPart.Field, fieldEditFormGroup);

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

function mapSchemeTeamFormationPlayerEditFieldFormModels(enumService: EnumService, model: ISchemeGameTeamModel | empty = null): ISchemeFormationPlayerEditFieldFormModel[] {
    const formationId: number = model?.formation.formationId
        ? getFormationEnum(model.formation.formationId, enumService.enums.formations)!.key
        : enumService.enums.formations[0].key,
        formation: IFormationEnumModel = firstOrDefault(enumService.enums.formations, (formation: IFormationEnumModel) => formation.key === formationId)!;

    return buildSchemeTeamFormationPlayerEditFieldFormModels(formation, model?.formation.players || [])
}
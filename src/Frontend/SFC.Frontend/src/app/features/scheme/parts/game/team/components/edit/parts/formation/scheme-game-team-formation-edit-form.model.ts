import { ISelectItemModel } from "ngx-sfc-inputs";
import { ISchemeFormationEditFieldFormModel } from "../../../../../../../components/edit/parts/formation/parts/field/models/scheme-formation-edit-field-form.model";

export interface ISchemeGameTeamFormationEditFormModel {
    type: ISelectItemModel;
    formation: number;
    field: ISchemeFormationEditFieldFormModel;
}
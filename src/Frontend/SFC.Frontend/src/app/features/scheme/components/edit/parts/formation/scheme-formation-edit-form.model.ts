import { ISelectItemModel } from "ngx-sfc-inputs";
import { ISchemeFormationEditFieldFormModel } from "./parts/field/models/scheme-formation-edit-field-form.model";

export interface ISchemeFormationEditFormModel {
    type: ISelectItemModel;
    formation: number;
    field: ISchemeFormationEditFieldFormModel;
}
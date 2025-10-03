import { ISelectItemModel } from "ngx-sfc-inputs";
import { ISchemeTeamFormationEditFieldFormModel } from "./parts/field/models/scheme-team-formation-edit-field-form.model";

export interface ISchemeTeamFormationEditFormModel {
    type: ISelectItemModel;
    formation: number;
    field: ISchemeTeamFormationEditFieldFormModel;
}
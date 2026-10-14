import { ISelectItemModel } from "ngx-sfc-inputs";
import { ISchemeGameTeamFormationEditFieldFormModel } from "./parts/field/models/scheme-game-team-formation-edit-field-form.model";

export interface ISchemeGameTeamFormationEditFormModel {
    type: ISelectItemModel;
    formation: number;
    field: ISchemeGameTeamFormationEditFieldFormModel;
}
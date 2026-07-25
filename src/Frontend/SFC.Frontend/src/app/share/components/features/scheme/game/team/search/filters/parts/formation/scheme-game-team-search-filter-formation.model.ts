import { empty } from "ngx-sfc-common";
import { IRangeLimitValueModel, ISelectValue } from "ngx-sfc-inputs";

export interface ISchemeGameTeamSearchFilterFormationModel {
    formation?: ISelectValue | empty;
    raiting?: IRangeLimitValueModel | empty;
}
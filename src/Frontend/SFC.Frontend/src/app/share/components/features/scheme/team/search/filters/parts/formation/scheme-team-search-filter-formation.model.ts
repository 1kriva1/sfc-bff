import { empty } from "ngx-sfc-common";
import { IRangeLimitValueModel, ISelectValue } from "ngx-sfc-inputs";

export interface ISchemeTeamSearchFilterFormationModel {
    formation?: ISelectValue | empty;
    raiting?: IRangeLimitValueModel | empty;
}
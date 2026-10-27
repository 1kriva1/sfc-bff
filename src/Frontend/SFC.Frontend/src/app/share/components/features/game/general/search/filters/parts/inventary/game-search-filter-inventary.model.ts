import { empty } from "ngx-sfc-common";
import { IRangeLimitValueModel } from "ngx-sfc-inputs";

export interface IGameSearchFilterInventaryModel {
    shirtsRequired?: boolean | empty;
    shirtsCount?: IRangeLimitValueModel | empty;
}
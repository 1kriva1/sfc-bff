import { empty } from "ngx-sfc-common";
import { IRangeLimitValueModel } from "ngx-sfc-inputs";

export interface IGameSearchFilterFinancialModel {
    freeGame?: boolean | empty;
    payAmount?: IRangeLimitValueModel | empty;
}
import { ILimitSearchModel } from "@core/models";
import { empty } from "ngx-sfc-common";

export interface IGameFindFinancialProfileFilterModel {
    FreeGame?: boolean | empty;
    PayAmount?: ILimitSearchModel<number> | empty;
}
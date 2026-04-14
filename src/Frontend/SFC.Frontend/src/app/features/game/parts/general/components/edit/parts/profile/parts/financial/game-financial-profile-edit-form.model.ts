import { empty } from "ngx-sfc-common";

export interface IGameFinancialProfileEditFormModel {
    freeGame: boolean;
    payAmount: number | empty;
}
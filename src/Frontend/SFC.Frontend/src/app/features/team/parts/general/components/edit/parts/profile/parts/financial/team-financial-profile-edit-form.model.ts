import { empty } from "ngx-sfc-common";

export interface ITeamFinancialProfileEditFormModel {
    shirts: number[] | empty;
    freePlay: boolean | null;
    hasManiches: boolean | null;    
}
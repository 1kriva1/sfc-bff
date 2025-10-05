import { empty } from "ngx-sfc-common";
import { IFindTeamsFinancialProfileFilterModel } from "./find-teams-financial-profile-filter.model";
import { IFindTeamsGeneralProfileFilterModel } from "./find-teams-general-profile-filter.model";
import { IFindTeamsInventaryProfileFilterModel } from "./find-teams-inventary-profile-filter.model";

export interface IFindTeamsProfileFilterModel {
    General?: IFindTeamsGeneralProfileFilterModel | empty;
    Financial?: IFindTeamsFinancialProfileFilterModel | empty;
    Inventary?: IFindTeamsInventaryProfileFilterModel | empty;
}
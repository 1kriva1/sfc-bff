import { empty } from "ngx-sfc-common";
import { IFindGameTeamsFinancialProfileFilterModel } from "./find-game-teams-financial-profile-filter.model";
import { IFindGameTeamsGeneralProfileFilterModel } from "./find-game-teams-general-profile-filter.model";
import { IFindGameTeamsInventaryProfileFilterModel } from "./find-game-teams-inventary-profile-filter.model";

export interface IFindGameTeamsProfileFilterModel {
    General?: IFindGameTeamsGeneralProfileFilterModel | empty;
    Financial?: IFindGameTeamsFinancialProfileFilterModel | empty;
    Inventary?: IFindGameTeamsInventaryProfileFilterModel | empty;
}
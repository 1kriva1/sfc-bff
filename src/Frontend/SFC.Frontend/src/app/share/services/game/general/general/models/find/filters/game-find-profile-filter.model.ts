import { empty } from "ngx-sfc-common";
import { IGameFindFinancialProfileFilterModel } from "./game-find-financial-profile-filter.model";
import { IGameFindGeneralProfileFilterModel } from "./game-find-general-profile-filter.model";
import { IGameFindInventaryProfileFilterModel } from "./game-find-inventary-profile-filter.model";

export interface IGameFindProfileFilterModel {
    General?: IGameFindGeneralProfileFilterModel | empty;
    Financial?: IGameFindFinancialProfileFilterModel | empty;
    Inventary?: IGameFindInventaryProfileFilterModel | empty;
}
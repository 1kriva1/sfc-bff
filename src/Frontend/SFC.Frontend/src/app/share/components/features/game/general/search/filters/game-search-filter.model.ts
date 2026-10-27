import { IGameSearchFilterFinancialModel } from "./parts/financial/game-search-filter-financial.model";
import { IGameSearchFilterGeneralModel } from "./parts/general/game-search-filter-general.model";
import { IGameSearchFilterInventaryModel } from "./parts/inventary/game-search-filter-inventary.model";

export interface IGameSearchFilterModel {
    general?: IGameSearchFilterGeneralModel;
    financial?: IGameSearchFilterFinancialModel;
    inventary?: IGameSearchFilterInventaryModel;
}
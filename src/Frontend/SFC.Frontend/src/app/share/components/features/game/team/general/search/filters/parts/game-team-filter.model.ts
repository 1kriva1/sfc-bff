import { IGameTeamSearchFilterFinancialModel } from "./financial/game-team-search-filter-financial.model";
import { IGameTeamSearchFilterGeneralModel } from "./general/game-team-search-filter-general.model";
import { IGameTeamSearchFilterInventaryModel } from "./inventary/game-team-search-filter-inventary.model";

export interface IGameTeamFilterModel {
    general: IGameTeamSearchFilterGeneralModel;
    financial: IGameTeamSearchFilterFinancialModel;
    inventary: IGameTeamSearchFilterInventaryModel;
}
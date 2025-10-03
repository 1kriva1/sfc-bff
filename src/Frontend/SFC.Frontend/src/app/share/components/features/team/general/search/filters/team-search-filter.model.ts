import { ITeamSearchFilterFinancialModel } from "./parts/financial/team-search-filter-financial.model";
import { ITeamSearchFilterGeneralModel } from "./parts/general/team-search-filter-general.model";
import { ITeamSearchFilterInventaryModel } from "./parts/inventary/team-search-filter-inventary.model";

export interface ITeamSearchFilterModel {
    name: string | null;
    general: ITeamSearchFilterGeneralModel;
    financial: ITeamSearchFilterFinancialModel;
    inventary: ITeamSearchFilterInventaryModel;
}
import { empty } from "ngx-sfc-common";
import { IGameTeamPlayerSearchFilterGeneralModel } from "./general/game-team-player-search-filter-general.model";

export interface IGameTeamPlayerFilterModel {
    general?: IGameTeamPlayerSearchFilterGeneralModel;
    excludeIds?: number[] | empty;
}
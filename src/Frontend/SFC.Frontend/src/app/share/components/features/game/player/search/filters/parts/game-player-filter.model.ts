import { empty } from "ngx-sfc-common";
import { IGamePlayerSearchFilterGeneralModel } from "./general/game-player-search-filter-general.model";

export interface IGamePlayerFilterModel {
    general?: IGamePlayerSearchFilterGeneralModel | empty;
}
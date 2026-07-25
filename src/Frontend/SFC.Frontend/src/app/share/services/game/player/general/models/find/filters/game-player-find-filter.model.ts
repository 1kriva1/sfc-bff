import { IFindPlayersFilterModel } from "@share/services/player/general/models/find/filters/find-players-filter.model";
import { empty } from "ngx-sfc-common";

export interface IGamePlayerGamePlayerFindFilterModel {
    Statuses: number[];
    ExcludeIds?: number[] | empty;
}

export interface IGamePlayerFindFilterModel {
    GamePlayer: IGamePlayerGamePlayerFindFilterModel;
    Player: IFindPlayersFilterModel;
}
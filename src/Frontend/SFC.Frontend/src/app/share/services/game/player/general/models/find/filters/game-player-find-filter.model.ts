import { IFindPlayersFilterModel } from "@share/services/player/general/models/find/filters/find-players-filter.model";

export interface IGamePlayerGamePlayerFindFilterModel {
    Statuses: number[];
}

export interface IGamePlayerFindFilterModel {
    GamePlayer: IGamePlayerGamePlayerFindFilterModel;
    Player: IFindPlayersFilterModel;
}
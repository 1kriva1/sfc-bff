import { IFindPlayersFilterModel } from "@share/services/player/general/models/find/filters/find-players-filter.model";
import { empty } from "ngx-sfc-common";

export interface IGameTeamPlayerGameTeamPlayerFindFilterModel {
    ExcludeIds?: number[] | empty;
}

export interface IGameTeamPlayerFindFilterModel {
    GameTeamPlayer: IGameTeamPlayerGameTeamPlayerFindFilterModel;
    Player: IFindPlayersFilterModel;
}
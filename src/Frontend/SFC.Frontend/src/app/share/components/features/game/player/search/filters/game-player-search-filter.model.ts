import { IPlayersFilterModel } from "@share/components/features/player";
import { IGamePlayerFilterModel } from "./parts/game-player-filter.model";

export interface IGamePlayerSearchFilterModel {
    gamePlayer?: IGamePlayerFilterModel;
    player?: IPlayersFilterModel;    
}
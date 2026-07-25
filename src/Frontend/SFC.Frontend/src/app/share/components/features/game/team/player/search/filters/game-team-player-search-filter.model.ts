import { IPlayersFilterModel } from "@share/components/features/player";
import { IGameTeamPlayerFilterModel } from "./parts/game-team-player-filter.model";

export interface IGameTeamPlayerSearchFilterModel {
    gameTeamPlayer: IGameTeamPlayerFilterModel;
    player: IPlayersFilterModel;    
}
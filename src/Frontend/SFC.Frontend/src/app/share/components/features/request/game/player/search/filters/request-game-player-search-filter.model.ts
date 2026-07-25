import { IPlayersFilterModel } from "@share/components/features/player";
import { IRequestGamePlayerFilterModel } from "./parts/request-game-player-filter.model";

export interface IRequestGamePlayerSearchFilterModel {
    player: IPlayersFilterModel;
    request: IRequestGamePlayerFilterModel;
}
import { IPlayerProfileModel } from "./player-profile.model";
import { IPlayerStatsModel } from "./player-stats.model";

export interface IPlayerModel {
    Id: number;
    Profile: IPlayerProfileModel;
    Stats: IPlayerStatsModel;
}
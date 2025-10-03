import { IPlayerItemProfileModel } from "./player-item-profile.model";
import { IPlayerItemStatsModel } from "./player-item-stats.model";

export interface IPlayerItemModel {
    Id: number;
    Profile: IPlayerItemProfileModel;
    Stats: IPlayerItemStatsModel;
}
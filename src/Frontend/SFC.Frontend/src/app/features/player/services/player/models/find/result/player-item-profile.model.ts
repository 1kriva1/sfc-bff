import { IPlayerItemFootballProfileModel } from "./player-item-football-profile.model";
import { IPlayerItemGeneralProfileModel } from "./player-item-general-profile.model";

export interface IPlayerItemProfileModel {
    General: IPlayerItemGeneralProfileModel;
    Football: IPlayerItemFootballProfileModel;
}
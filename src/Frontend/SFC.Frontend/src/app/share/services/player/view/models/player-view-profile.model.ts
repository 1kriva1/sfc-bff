import { IPlayerViewFootballProfileModel } from "./player-view-football-profile.model";
import { IPlayerViewGeneralProfileModel } from "./player-view-general-profile.model";

export interface IPlayerViewProfileModel {
    general: IPlayerViewGeneralProfileModel;
    football: IPlayerViewFootballProfileModel;
}
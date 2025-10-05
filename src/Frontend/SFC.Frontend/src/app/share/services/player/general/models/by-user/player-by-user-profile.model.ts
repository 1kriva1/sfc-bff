import { IPlayerByUserFootballProfileModel } from "./player-by-user-football-profile.model";
import { IPlayerByUserGeneralProfileModel } from "./player-by-user-general-profile.model";

export interface IPlayerByUserProfileModel {
    General: IPlayerByUserGeneralProfileModel;
    Football: IPlayerByUserFootballProfileModel;
}
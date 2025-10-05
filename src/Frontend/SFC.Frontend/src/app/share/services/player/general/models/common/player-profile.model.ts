import { IPlayerFootballProfileModel } from "./player-football-profile.model";
import { IPlayerGeneralProfileModel } from "./player-general-profile.model";

export interface IPlayerProfileModel {
    General: IPlayerGeneralProfileModel;
    Football: IPlayerFootballProfileModel;
}
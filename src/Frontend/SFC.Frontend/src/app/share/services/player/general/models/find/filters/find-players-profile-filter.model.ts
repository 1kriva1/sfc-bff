import { IFindPlayersFootballProfileFilterModel } from "./find-players-football-profile-filter.model";
import { IFindPlayersGeneralProfileFilterModel } from "./find-players-general-profile-filter.model";

export interface IFindPlayersProfileFilterModel {
    General: IFindPlayersGeneralProfileFilterModel;
    Football: IFindPlayersFootballProfileFilterModel;
}
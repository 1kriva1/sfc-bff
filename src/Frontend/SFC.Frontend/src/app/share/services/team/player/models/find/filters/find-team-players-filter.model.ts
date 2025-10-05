import { IFindPlayersFilterModel } from "@share/services";

export interface IFindTeamPlayersTeamPlayerFilterModel{
    Statuses: number[];
}

export interface IFindTeamPlayersFilterModel {
    TeamPlayer: IFindTeamPlayersTeamPlayerFilterModel;
    Player: IFindPlayersFilterModel;
}
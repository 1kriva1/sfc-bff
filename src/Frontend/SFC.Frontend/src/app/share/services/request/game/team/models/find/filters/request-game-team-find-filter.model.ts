import { IFindTeamsFilterModel } from "@share/services/team";

export interface IRequestGameTeamRequestFindFilterModel{
    Statuses: number[];
}

export interface IRequestGameTeamFindFilterModel {
    Request: IRequestGameTeamRequestFindFilterModel;
    Team: IFindTeamsFilterModel;
}
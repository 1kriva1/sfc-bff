import { IFindPlayersFilterModel } from "@share/services";

export interface IFindTeamPlayerRequestsRequestFilterModel{
    Statuses: number[];
}

export interface IFindTeamPlayerRequestsFilterModel {
    Request: IFindTeamPlayerRequestsRequestFilterModel;
    Player: IFindPlayersFilterModel;
}
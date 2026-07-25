import { IFindPlayersFilterModel } from "@share/services/player/general/models/find/filters/find-players-filter.model";

export interface IRequestGamePlayerRequestFindFilterModel{
    Statuses: number[];
}

export interface IRequestGamePlayerFindFilterModel {
    Request: IRequestGamePlayerRequestFindFilterModel;
    Player: IFindPlayersFilterModel;
}
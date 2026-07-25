import { IFindPlayersFilterModel } from "@share/services/player/general/models/find/filters/find-players-filter.model";

export interface IFindInviteGamePlayerInviteFilterModel{
    Statuses: number[];
}

export interface IFindInviteGamePlayerFilterModel {
    Invite: IFindInviteGamePlayerInviteFilterModel;
    Player: IFindPlayersFilterModel;
}
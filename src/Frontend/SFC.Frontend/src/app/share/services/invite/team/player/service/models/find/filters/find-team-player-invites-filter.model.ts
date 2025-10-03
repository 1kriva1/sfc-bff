import { IFindPlayersFilterModel } from "../../../../../../../../services/player/general/models/find/filters/find-players-filter.model";

export interface IFindTeamPlayerInvitesInviteFilterModel{
    Statuses: number[];
}

export interface IFindTeamPlayerInvitesFilterModel {
    Invite: IFindTeamPlayerInvitesInviteFilterModel;
    Player: IFindPlayersFilterModel;
}
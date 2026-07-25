import { IFindTeamsFilterModel } from "@share/services/team";

export interface IInviteGameTeamInviteFindFilterModel{
    Statuses: number[];
}

export interface IInviteGameTeamFindFilterModel {
    Invite: IInviteGameTeamInviteFindFilterModel;
    Team: IFindTeamsFilterModel;
}
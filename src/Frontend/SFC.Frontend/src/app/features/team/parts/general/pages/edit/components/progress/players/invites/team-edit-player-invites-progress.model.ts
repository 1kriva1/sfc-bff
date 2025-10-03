export interface ITeamEditPlayerInvitesProgressModel {
    total: number;
    statuses: ITeamEditPlayerInvitesStatusProgressModel[]
}

export interface ITeamEditPlayerInvitesStatusProgressModel {
    key: number;
    label: string;
    count: number;
    progress: number;
}
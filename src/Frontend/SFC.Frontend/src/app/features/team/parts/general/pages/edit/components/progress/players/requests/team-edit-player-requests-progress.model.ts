export interface ITeamEditPlayerRequestsProgressModel {
    total: number;
    statuses: ITeamEditPlayerRequestStatusProgressModel[]
}

export interface ITeamEditPlayerRequestStatusProgressModel {
    key: number;
    label: string;
    count: number;
    progress: number;
}
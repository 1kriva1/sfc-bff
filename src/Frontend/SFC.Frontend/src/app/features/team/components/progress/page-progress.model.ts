export interface IPagePlayersTotalProgressModel {
    count: number;
    avarage: number;
}

export interface IPagePlayersPositionProgressModel {
    position: string;
    count: number;
    percentage: number;
}

export interface IPagePlayersProgressModel {
    total: IPagePlayersTotalProgressModel;
    footballPositions: IPagePlayersPositionProgressModel[];
}
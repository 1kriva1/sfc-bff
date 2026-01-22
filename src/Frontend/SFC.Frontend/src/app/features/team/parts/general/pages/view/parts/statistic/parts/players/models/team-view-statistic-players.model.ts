export interface ITeamViewStatisticPlayersTotalModel {
    all: number;
    active: number;
}

export interface ITeamViewStatisticPlayersModel {
    total: ITeamViewStatisticPlayersTotalModel;
    statusesChartData: any;
    positionsChartData: any;
}
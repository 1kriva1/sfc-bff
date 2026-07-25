export interface IGameTeamEditMainGameModel {
    name: string;
    date: string
    from: string;
    to: string;
}

export interface IGameTeamEditMainViewModel {
    game: IGameTeamEditMainGameModel;
}
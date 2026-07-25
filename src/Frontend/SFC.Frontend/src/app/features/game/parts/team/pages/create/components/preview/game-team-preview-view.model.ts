export interface IGameTeamPreviewGameViewModel {
    name: string;
    date: string
    from: string;
    to: string;
}

export interface IGameTeamPreviewViewModel {
    game: IGameTeamPreviewGameViewModel;
}
import { IPlayerModel } from "../player/player.model";

export interface ITeamPlayerModel {
    id: number;
    status: number;
    player: IPlayerModel;
}
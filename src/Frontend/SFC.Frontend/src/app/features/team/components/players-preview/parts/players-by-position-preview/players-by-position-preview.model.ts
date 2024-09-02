import { IPlayerItemModel } from "../item/models/player-item.model";

export interface IPlayersByPositionModel {
    position: string;
    players: IPlayerItemModel[];
}
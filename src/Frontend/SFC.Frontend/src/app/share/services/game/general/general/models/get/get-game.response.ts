import { BaseErrorResponse } from "@core/models";
import { IGameModel } from "../common/game.model";

export interface IGetGameResponse extends BaseErrorResponse {
    Game: IGameModel;
}
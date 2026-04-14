import { BaseErrorResponse } from "@core/models";
import { IGameModel } from "../common/game.model";

export interface ICreateGameResponse extends BaseErrorResponse{
    Game: IGameModel;
}
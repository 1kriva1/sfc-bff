import { BaseErrorResponse } from "@core/models";
import { IGetPlayerModel } from "./get-player.model";

export interface IGetPlayerResponse extends BaseErrorResponse {
    Player: IGetPlayerModel;
}
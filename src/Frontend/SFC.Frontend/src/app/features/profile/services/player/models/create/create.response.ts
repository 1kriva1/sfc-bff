import { BaseErrorResponse } from "@core/models";
import { ICreatePlayerModel } from "./create-player.model";

export interface ICreatePlayerResponse extends BaseErrorResponse {
    Player: ICreatePlayerModel;
}
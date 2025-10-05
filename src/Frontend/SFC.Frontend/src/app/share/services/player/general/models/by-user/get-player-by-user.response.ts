import { BaseErrorResponse } from "@core/models";
import { IPlayerByUserModel } from "./player-by-user.model";

export interface IGetPlayerByUserResponse extends BaseErrorResponse {
    Player: IPlayerByUserModel;
}
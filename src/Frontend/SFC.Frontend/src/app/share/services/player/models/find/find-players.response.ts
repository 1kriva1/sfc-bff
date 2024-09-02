import { BaseListResponse } from "@core/models";
import { IPlayerItemModel } from "./result/player-item.model";

export interface IFindPlayersResponse extends BaseListResponse<IPlayerItemModel> { }
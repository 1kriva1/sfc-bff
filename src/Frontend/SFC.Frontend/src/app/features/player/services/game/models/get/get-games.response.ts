import { BaseListResponse } from "@core/models";
import { IGetGamesItemModel } from "./result/get-games-item.model";

export interface IGetGamesResponse extends BaseListResponse<IGetGamesItemModel> { }
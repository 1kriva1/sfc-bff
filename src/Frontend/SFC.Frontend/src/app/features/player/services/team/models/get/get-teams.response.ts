import { BaseListResponse } from "@core/models";
import { IGetTeamsItemModel } from "./result/get-teams-item.model";

export interface IGetTeamsResponse extends BaseListResponse<IGetTeamsItemModel> { }
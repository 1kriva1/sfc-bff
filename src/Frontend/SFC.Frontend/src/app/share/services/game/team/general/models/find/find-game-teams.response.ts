import { BaseListResponse } from "@core/models";
import { IGameTeamModel } from "../common/game-team.model";

export interface IFindGameTeamsResponse extends BaseListResponse<IGameTeamModel> { }
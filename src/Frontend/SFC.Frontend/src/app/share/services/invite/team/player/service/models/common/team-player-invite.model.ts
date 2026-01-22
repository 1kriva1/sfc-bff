import { IPlayerModel } from "@share/services/player/general/models/common/player.model";
import { ITeamModel } from "@share/services/team/general/general/models/common/team.model";
import { empty } from "ngx-sfc-common";

export interface ITeamPlayerInviteModel {
    Id: number;
    Status: number;
    TeamComment: string;
    PlayerComment: string | empty;
    Team: ITeamModel;
    Player: IPlayerModel;
}
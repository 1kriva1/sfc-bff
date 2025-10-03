import { IPlayerModel } from "@share/services/player/general/models/common/player.model";
import { ITeamModel } from "@share/services/team/general/models/common/team.model";
import { empty } from "ngx-sfc-common";

export interface ITeamPlayerRequestModel {
    Id: number;
    Status: number;
    TeamComment: string| empty;
    PlayerComment: string ;
    Team: ITeamModel;
    Player: IPlayerModel;
}
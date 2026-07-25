import { IPlayerModel } from "@share/services/player";
import { ITeamModel } from "@share/services/team/general/general/models/common/team.model";
import { empty } from "ngx-sfc-common";

export interface IGameTeamPlayerModel {
    Id: number;
    Status: number;
    Player?: IPlayerModel | empty;
    Team?: ITeamModel | empty;
}
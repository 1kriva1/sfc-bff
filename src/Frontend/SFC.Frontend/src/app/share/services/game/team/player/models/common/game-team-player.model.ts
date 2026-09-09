import { IPlayerModel } from "@share/services/player";
import { empty } from "ngx-sfc-common";
import { IGameTeamModel } from "../../../general/models/common/game-team.model";

export interface IGameTeamPlayerModel {
    Id: number;
    Status: number;
    Player?: IPlayerModel | empty;
    GameTeam?: IGameTeamModel | empty;
}
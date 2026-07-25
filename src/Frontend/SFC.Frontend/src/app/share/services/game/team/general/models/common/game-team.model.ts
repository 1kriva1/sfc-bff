import { ITeamModel } from "@share/services/team/general/general/models/common/team.model";
import { empty } from "ngx-sfc-common";
import { IGameTeamPlayerModel } from "../../../player/models/common/game-team-player.model";

export interface IGameTeamModel {
    Id: number;
    Status: number;
    Index: number | empty;
    Team? : ITeamModel | empty;
    GameTeamPlayers? : IGameTeamPlayerModel[] | empty;
}
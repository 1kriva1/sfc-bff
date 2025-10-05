import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";
import { IPlayerModel } from "../player/player.model";
import { ITeamModel } from "../team/team.model";

export interface ITeamPlayerInviteModel {
    id: number;
    status: IEnumModel<number>;
    teamComment: string;
    playerComment: string | empty;
    player: IPlayerModel;
    team: ITeamModel;
}
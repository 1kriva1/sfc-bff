import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";
import { IPlayerModel } from "../player/player.model";
import { ITeamModel } from "../team/general/team.model";

export interface ITeamPlayerRequestModel {
    id: number;
    status: IEnumModel<number>;
    teamComment: string | empty;
    playerComment: string;
    player: IPlayerModel;
    team: ITeamModel;
}
import { IPlayerModel } from "@share/models/player/player.model";
import { ITeamModel } from "@share/models/team/general/team.model";
import { empty } from "ngx-sfc-common";

export interface IInviteTeamPlayerPreviewModel {
    player?: IPlayerModel | empty;
    team?: ITeamModel | empty;
}
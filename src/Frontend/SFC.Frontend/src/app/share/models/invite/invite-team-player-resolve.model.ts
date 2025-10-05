import { IPlayerModel } from "../player/player.model";
import { ITeamModel } from "../team/team.model";

export interface IInviteTeamPlayerResolveModel {
    player: IPlayerModel | null;
    team: ITeamModel | null;
}
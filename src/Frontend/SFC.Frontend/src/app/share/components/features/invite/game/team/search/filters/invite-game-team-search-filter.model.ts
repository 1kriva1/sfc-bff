import { IInviteGameTeamFilterModel } from "./parts/invite-game-team-filter.model";
import { ITeamSearchFilterModel } from "@share/components/features/team";

export interface IInviteGameTeamSearchFilterModel {
    invite: IInviteGameTeamFilterModel;
    team: ITeamSearchFilterModel;    
}
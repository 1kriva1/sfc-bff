import { IRequestGameTeamFilterModel } from "./parts/request-game-team-filter.model";
import { ITeamSearchFilterModel } from "@share/components/features/team";

export interface IRequestGameTeamSearchFilterModel {
    request: IRequestGameTeamFilterModel;
    team: ITeamSearchFilterModel;    
}
import { ITeamSearchFilterModel } from "@share/components/features/team/general/search/filters/team-search-filter.model";
import { IGameTeamFilterModel } from "./game-team-filter.model";

export interface IGameTeamSearchFilterModel {
    gameTeam?: IGameTeamFilterModel;
    team?: ITeamSearchFilterModel;
}
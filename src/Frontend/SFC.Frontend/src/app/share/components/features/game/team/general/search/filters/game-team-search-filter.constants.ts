import { TeamSearchFilterConstants } from "@share/components/features/team/general/search/filters/team-search-filter.constants";
import { IGameTeamSearchFilterModel } from "./models/game-team-search-filter.model";

export class GameTeamSearchFilterConstants {
    static DEFAULT_SEARCH_FILTER_VALUE: IGameTeamSearchFilterModel = {
        team: TeamSearchFilterConstants.DEFAULT_SEARCH_FILTER_VALUE,
        gameTeam: {
            statuses: []
        }
    };
}
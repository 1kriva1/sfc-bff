import { IGameTeamSearchTableModel } from "../../../../../../../features/game/team/general/search/table/game-team-search-table.model";

export interface IAvatarInputGameTeamsModalBodyEventModel{
    selected: boolean;
    gameTeam: IGameTeamSearchTableModel;
}
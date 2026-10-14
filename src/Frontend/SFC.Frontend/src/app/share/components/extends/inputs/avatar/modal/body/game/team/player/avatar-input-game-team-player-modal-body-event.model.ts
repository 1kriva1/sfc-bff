import { IGameTeamPlayerSearchTableModel } from "@share/components/features/game/team/player/search/table/game-team-player-search-table.model";

export interface IAvatarInputGameTeamPlayerModalBodyEventModel{
    selected: boolean;
    gameTeamPlayer: IGameTeamPlayerSearchTableModel;
}
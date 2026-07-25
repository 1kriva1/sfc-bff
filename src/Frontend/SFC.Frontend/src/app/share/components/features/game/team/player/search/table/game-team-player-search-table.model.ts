
import { IGameTeamPlayerModel } from "@share/models/game/team/game-team-player.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGameTeamPlayerSearchTableModel extends IGameTeamPlayerModel {
    actions?: IDropdownMenuItemModel[];
}
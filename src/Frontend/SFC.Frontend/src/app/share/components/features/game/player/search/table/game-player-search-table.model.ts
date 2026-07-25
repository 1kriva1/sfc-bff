
import { IGamePlayerModel } from "@share/models/game/player/game-player.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGamePlayerSearchTableModel extends IGamePlayerModel {
    actions?: IDropdownMenuItemModel[];
}
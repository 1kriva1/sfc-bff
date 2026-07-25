import { IGameTeamModel } from "@share/models/game";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGameTeamSearchTableModel extends IGameTeamModel {
    actions?: IDropdownMenuItemModel[];
}
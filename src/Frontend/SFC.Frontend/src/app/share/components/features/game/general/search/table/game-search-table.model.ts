import { IGameModel } from "@share/models";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGameSearchTableModel extends IGameModel {
    actions?: IDropdownMenuItemModel[];
}
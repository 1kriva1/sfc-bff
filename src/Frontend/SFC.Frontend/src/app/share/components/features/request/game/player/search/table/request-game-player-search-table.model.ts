import { IRequestGamePlayerModel } from "@share/models";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IRequestGamePlayerSearchTableModel extends IRequestGamePlayerModel {
    actions?: IDropdownMenuItemModel[];
}
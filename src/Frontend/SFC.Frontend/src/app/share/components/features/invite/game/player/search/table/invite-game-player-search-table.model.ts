import { IInviteGamePlayerModel } from "@share/models";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IInviteGamePlayerSearchTableModel extends IInviteGamePlayerModel {
    actions?: IDropdownMenuItemModel[];
}
import { ISchemeTeamModel } from "@share/models";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ISchemeTeamSearchTableModel extends ISchemeTeamModel {
    actions?: IDropdownMenuItemModel[];
}
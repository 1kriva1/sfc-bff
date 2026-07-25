import { ISchemeGameTeamModel } from "@share/models";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ISchemeGameTeamSearchTableModel extends ISchemeGameTeamModel {
    actions?: IDropdownMenuItemModel[];
}

import { ISchemeTeamModel } from "@share/models";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamEditSchemesTableModel extends ISchemeTeamModel {
    actions?: IDropdownMenuItemModel[];
}
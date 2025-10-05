import { ISchemeTeamModel } from "@share/models/scheme/scheme-team.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamEditSchemesTableModel extends ISchemeTeamModel {
    actions?: IDropdownMenuItemModel[];
}
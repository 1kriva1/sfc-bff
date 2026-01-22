import { ITeamModel } from "@share/models/team/general/team.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamSearchTableModel extends ITeamModel {
    actions?: IDropdownMenuItemModel[];
}
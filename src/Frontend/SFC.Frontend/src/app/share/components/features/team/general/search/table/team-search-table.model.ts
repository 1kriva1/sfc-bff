import { ITeamModel } from "@share/models/team/team.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamSearchTableModel extends ITeamModel {
    actions?: IDropdownMenuItemModel[];
}
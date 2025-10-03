import { ITeamPlayerModel } from "@share/models/team/team-player.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamPlayerSearchTableModel extends ITeamPlayerModel {
    actions?: IDropdownMenuItemModel[];
}
import { ITeamPlayerRequestModel } from "@share/models/request/team-player-request.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamEditPlayersRequestTableModel extends ITeamPlayerRequestModel {
    actions?: IDropdownMenuItemModel[];
}
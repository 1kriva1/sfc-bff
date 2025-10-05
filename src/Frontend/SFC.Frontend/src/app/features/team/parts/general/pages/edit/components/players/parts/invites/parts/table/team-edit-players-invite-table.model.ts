import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamEditPlayersInviteTableModel extends ITeamPlayerInviteModel {
    actions?: IDropdownMenuItemModel[];
}
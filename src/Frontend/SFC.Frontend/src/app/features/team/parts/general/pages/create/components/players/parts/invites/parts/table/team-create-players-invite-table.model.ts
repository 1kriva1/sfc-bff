import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamCreatePlayerInviteTableModel extends ITeamPlayerInviteModel {
    actions?: IDropdownMenuItemModel[];
}
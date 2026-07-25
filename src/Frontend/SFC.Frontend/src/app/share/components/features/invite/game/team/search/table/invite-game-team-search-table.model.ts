import { IInviteGameTeamModel } from "@share/models/invite/invite-game-team.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IInviteGameTeamSearchTableModel extends IInviteGameTeamModel {
    actions?: IDropdownMenuItemModel[];
}
import { IRequestGameTeamModel } from "@share/models/request/request-game-team.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IRequestGameTeamSearchTableModel extends IRequestGameTeamModel {
    actions?: IDropdownMenuItemModel[];
}
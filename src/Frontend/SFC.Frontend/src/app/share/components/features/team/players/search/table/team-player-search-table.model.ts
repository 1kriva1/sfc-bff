import { ITeamPlayerStatisticActivityModel } from "@share/models";
import { ITeamPlayerModel } from "@share/models/team/player/team-player.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamPlayerSearchTableModel extends ITeamPlayerModel {
    activity?: ITeamPlayerStatisticActivityModel;
    actions?: IDropdownMenuItemModel[];
}
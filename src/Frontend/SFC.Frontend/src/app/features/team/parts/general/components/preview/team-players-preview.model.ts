import { IPlayerModel } from "@share/models/player/player.model";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamPlayersPreviewModel extends IPlayerModel {
    actions?: IDropdownMenuItemModel[];
}
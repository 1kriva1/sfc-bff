
import { IPlayersTableModel } from "@share/components/features/player";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamEditPlayersSquadTableModel {
    id: number;
    status: number;
    player: IPlayersTableModel;
    actions?: IDropdownMenuItemModel[];
}
import { IEnumModel } from "@core/types";
import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IInviteGameTeamSearchTableRowModel {
    name: string;
    city: string;
    logo: string | empty;
    status: IEnumModel<number>;
    raiting: number;
    players: number;
    actions: IDropdownMenuItemModel[];
}
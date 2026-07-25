import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGameTeamPlayerTeamSearchTableRowModel {
    name: string;
    city: string;
    logo: string | empty;
    raiting: number;
}

export interface IGameTeamPlayerSearchTableRowModel {
    firstName: string;
    lastName: string;
    city: string;
    photo?: string | empty;
    birthday: Date | empty;
    status: number | empty;
    stats: StatsValue;
    position?: number | empty;
    team?: IGameTeamPlayerTeamSearchTableRowModel;
    actions?: IDropdownMenuItemModel[] | empty;
}
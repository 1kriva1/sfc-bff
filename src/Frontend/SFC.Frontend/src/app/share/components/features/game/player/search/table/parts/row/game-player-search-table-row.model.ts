import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IGamePlayerTeamSearchTableRowModel {
    name: string;
    city: string;
    logo: string | empty;
    raiting: number;
}

export interface IGamePlayerSearchTableRowModel {
    firstName: string;
    lastName: string;
    city: string;
    photo?: string | empty;
    birthday: Date | empty;
    status: number;
    stats: StatsValue;
    position?: number | empty;
    team?: IGamePlayerTeamSearchTableRowModel;
    actions?: IDropdownMenuItemModel[] | empty;
}
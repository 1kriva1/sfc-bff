import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ITeamPlayerSearchTableRowModel {
    firstName: string;
    lastName: string;
    city: string;
    photo?: string | empty;
    birthday: Date | empty;
    status: number;
    stats: StatsValue;
    position?: number | empty;
    games: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    actions? : IDropdownMenuItemModel[] | empty;
}
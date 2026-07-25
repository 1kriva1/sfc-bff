import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IInviteGamePlayerSearchTableCardModel {
    firstName: string;
    lastName: string;
    city: string;
    photo?: string | empty;
    birthday: Date | empty;
    status: number;
    stats: StatsValue;
    position?: number | empty;
    actions? : IDropdownMenuItemModel[] | empty;
}
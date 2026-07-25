import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IRequestGamePlayerInfoModel {
    photo?: string | empty;    
    firstName?: string | empty;
    lastName?: string | empty;
    city?: string | empty;
    birthday?: Date | empty;
    position?: number| empty;    
    stats?: StatsValue | empty;
    status?: number | empty;
    actions?: IDropdownMenuItemModel[] | empty;
}
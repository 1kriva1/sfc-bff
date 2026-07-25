import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface IInviteGameTeamInfoModel {
    name?: string | empty;
    city?: string | empty;
    logo?: string | empty;
    raiting?: number | empty;
    tags?: string[] | empty;
    status?: number | empty;
    actions?: IDropdownMenuItemModel[] | empty;
}
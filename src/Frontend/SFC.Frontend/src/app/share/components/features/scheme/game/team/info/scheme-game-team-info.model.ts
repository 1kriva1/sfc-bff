import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ISchemeGameTeamInfoModel {    
    name?: string | empty;
    formation: number;  
    raiting?: number | empty;
    players?: number | empty;
    actions?: IDropdownMenuItemModel[] | empty;
}
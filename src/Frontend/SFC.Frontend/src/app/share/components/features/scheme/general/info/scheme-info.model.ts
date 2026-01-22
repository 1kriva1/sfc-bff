import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export interface ISchemeInfoModel {    
    name?: string | empty;
    formation: number;  
    raiting?: number | empty;
    actions?: IDropdownMenuItemModel[] | empty;
}
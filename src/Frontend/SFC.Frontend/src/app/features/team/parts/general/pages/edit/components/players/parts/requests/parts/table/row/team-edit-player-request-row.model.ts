import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface ITeamEditPlayerRequestRowModel {
    position: IEnumModel<number> | empty;
    status: IEnumModel<number>;
}
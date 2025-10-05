import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface ITeamEditPlayerInviteRowModel {
    position: IEnumModel<number> | empty;
    status: IEnumModel<number>;
}
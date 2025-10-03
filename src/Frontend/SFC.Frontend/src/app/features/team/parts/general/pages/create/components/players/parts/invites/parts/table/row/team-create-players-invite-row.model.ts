import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface ITeamCreatePlayersInviteRowModel {
    position: IEnumModel<number> | empty;
    status: IEnumModel<number>;
}
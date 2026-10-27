import { IEnumModel } from "@share/models";
import { empty } from "ngx-sfc-common";

export interface ITeamEditPlayerSquadRowModel {
    position: IEnumModel<number> | empty;
    status: IEnumModel<number>;
}
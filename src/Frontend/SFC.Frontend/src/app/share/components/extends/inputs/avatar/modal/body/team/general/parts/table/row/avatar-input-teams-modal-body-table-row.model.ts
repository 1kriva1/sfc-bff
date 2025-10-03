import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface IAvatarInputTeamsModalBodyTableRowModel {
    status: IEnumModel<number>;
    description: string | empty;
}
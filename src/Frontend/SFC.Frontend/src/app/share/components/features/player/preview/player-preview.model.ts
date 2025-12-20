import { IEnumModel } from "@core/types";
import { StatsValue } from "@share/types";
import { empty, ITagModel } from "ngx-sfc-common";

export interface IPlayerPreviewModel {
    firstName: string;
    lastName: string;
    city: string;
    age: number | null;
    tags: ITagModel[];
    position: IEnumModel<number> | empty;
    stats: StatsValue;
}
import { IEnumModel } from "@core/types";
import { StatsValue } from "@share/types";
import { empty } from "ngx-sfc-common";
import { ITagModel } from "ngx-sfc-components";

export interface IPlayerPreviewModel {
    firstName: string;
    lastName: string;
    city: string;
    age: number | null;
    tags: ITagModel[];
    position: IEnumModel<number> | empty;
    stats: StatsValue;
}
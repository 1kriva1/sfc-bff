import { empty } from "ngx-sfc-common";

export interface IStatsTypeModel {
    label: string;
    description?: string | empty;
    total: number;
    value: number;
}
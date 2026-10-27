import { IBadgeTypeEnumModel } from "@share/models/enum/badge-type-enum.model";

export interface IBadgeCardModel {
    points: number;
    progress: number;
    total: number;
    type: IBadgeTypeEnumModel;
}
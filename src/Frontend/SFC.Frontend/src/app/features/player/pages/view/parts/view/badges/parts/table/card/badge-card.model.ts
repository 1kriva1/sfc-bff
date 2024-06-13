import { IBadgeTypeEnumModel } from "@share/services/enum/models/enums.model";

export interface IBadgeCardModel {
    points: number;
    progress: number;
    total: number;
    type: IBadgeTypeEnumModel;
}
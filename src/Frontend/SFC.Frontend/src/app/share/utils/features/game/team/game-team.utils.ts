import { IEnumModel } from "@core/types";
import { IEnumsModel } from "@share/services";

export function getGameTeamActiveStatusEnum(enums: IEnumsModel): IEnumModel<number> {
    return enums.gameTeamStatuses[0];
}

export function getGameTeamOutOfGameStatusEnum(enums: IEnumsModel): IEnumModel<number> {
    return enums.gameTeamStatuses[1];
}
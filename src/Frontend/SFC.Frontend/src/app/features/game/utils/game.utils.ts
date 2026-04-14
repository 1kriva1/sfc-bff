import { IEnumModel } from "@core/types";
import { IEnumsModel } from "@share/services/enum";

export function getGameNewStatusEnum(enums: IEnumsModel): IEnumModel<number> {
    return enums.gameStatuses[0];
}
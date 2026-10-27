import { Enum } from "@share/enums";
import { IEnumModel } from "@share/models";
import { IEnumsModel } from "@share/services/enum";
import { firstOrDefault } from "ngx-sfc-common";

export function getGameNewStatusEnum(enums: IEnumsModel): IEnumModel<number> {
    return firstOrDefault(enums.gameStatuses, status => status.key == Enum.GameStatus.New)!;
}
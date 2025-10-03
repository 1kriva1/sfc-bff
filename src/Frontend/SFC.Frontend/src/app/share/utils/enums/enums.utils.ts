import { IEnumModel } from "@core/types";
import { IEnumsModel } from "../../services";

export function ActiveInviteStatus(enums: IEnumsModel): IEnumModel<number> {
    return enums.inviteStatuses[0];
}
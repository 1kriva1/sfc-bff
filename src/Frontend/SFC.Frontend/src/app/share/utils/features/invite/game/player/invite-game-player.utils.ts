import { IEnumsModel } from "@share/services";

export function isInviteGamePlayerActual(status: number, enums: IEnumsModel): boolean {
    return status == enums.inviteStatuses[0].key;
}
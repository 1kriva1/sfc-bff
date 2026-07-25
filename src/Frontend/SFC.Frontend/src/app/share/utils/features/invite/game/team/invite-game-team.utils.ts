import { IEnumsModel } from "@share/services";

export function isInviteGameTeamActual(status: number, enums: IEnumsModel): boolean {
    return status == enums.inviteStatuses[0].key;
}
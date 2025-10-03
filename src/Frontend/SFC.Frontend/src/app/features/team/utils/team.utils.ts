import { IEnumsModel } from "@share/services/enum/models/enum/enums.model";

export function isTeamPlayerActive(status: number, enums: IEnumsModel): boolean {
    return status == enums.teamPlayerStatuses[0].key;
}

export function isTeamPlayerInviteActual(status: number, enums: IEnumsModel): boolean {
    return status == enums.inviteStatuses[0].key;
}

export function isTeamPlayerRequestActual(status: number, enums: IEnumsModel): boolean {
    return status == enums.requestStatuses[0].key;
}
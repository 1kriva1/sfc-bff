import { IEnumsModel } from "@share/services";

export function isRequestGameTeamActual(status: number, enums: IEnumsModel): boolean {
    return status == enums.requestStatuses[0].key;
}
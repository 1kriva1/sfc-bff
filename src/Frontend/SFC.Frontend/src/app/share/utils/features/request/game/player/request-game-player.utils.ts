import { IEnumsModel } from "@share/services";

export function isRequestGamePlayerActual(status: number, enums: IEnumsModel): boolean {
    return status == enums.requestStatuses[0].key;
}
import { IEnumModel } from "@core/types";
import { getEnum } from "@core/utils";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { IFormationPositionEnumModel } from "@share/services/enum/models/enum/formation-position-enum.model";
import { empty, firstOrDefault, isDefined } from "ngx-sfc-common";

export function getFormationEnum(value: number | null, values: IFormationEnumModel[]): IFormationEnumModel | empty {
    return isDefined(value)
        ? firstOrDefault(values, item => item.key == value)
        : null;
}

export function getFormationLabel(value: number[][]): string {
    return value.map(row => row.length).join('-');
}

export function getFormationTotalPlayers(value: number | null, values: IFormationEnumModel[]): number {
    const formation: IFormationEnumModel = getFormationEnum(value, values)!;
    return formation.value.reduce((sum, subArray) => sum + subArray.length, 0);
}

export function getFormationType(value: number, values: IEnumModel<number>[]): IEnumModel<number> | empty {
    return firstOrDefault(values, type => type.key === value);
}

export function getFormationPositionEnum(value: number | null, values: IFormationPositionEnumModel[]): IFormationPositionEnumModel {
    return getEnum(value, values) as IFormationPositionEnumModel;
}
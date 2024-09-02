import { IEnumModel } from "@core/types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type IStatTypeEnumModel = {
    key: number;
    value: string;
    category: number;
    skill: number;
}

export type IBadgeTypeEnumModel = {
    key: number;
    value: string;
    description: string;
    icon: IconDefinition
}

export interface IEnumsModel {
    footballPositions: IEnumModel<number>[];
    gameStyles: IEnumModel<number>[];
    statCategories: IEnumModel<number>[];
    statSkills: IEnumModel<number>[];
    statTypes: IStatTypeEnumModel[];
    workingFoots: IEnumModel<number>[];
    badgeTypes: IBadgeTypeEnumModel[];
    gameStatuses: IEnumModel<number>[];
    teamStatuses: IEnumModel<number>[];
    shirts: IEnumModel<number>[];
}
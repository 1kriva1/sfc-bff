import { ILimitModel } from "@core/models";

export interface IFootballFilterModel {
    height: ILimitModel<number>;
    weight: ILimitModel<number>;
    positions: number[] | null;
    workingFoot: number | null;
    gameStyles: number[] | null;
    skill: number | null;
    physicalCondition: number | null;
}
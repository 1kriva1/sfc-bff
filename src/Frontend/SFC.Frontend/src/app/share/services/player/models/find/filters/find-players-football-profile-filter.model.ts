import { ILimitSearchModel } from "@core/models";

export interface IFindPlayersFootballProfileFilterModel {
    Positions: number[] | null;
    PhysicalCondition: number | null;
    GameStyles: number[] | null;
    WorkingFoot: number | null;
    Height: ILimitSearchModel<number>;
    Weight: ILimitSearchModel<number>;
    Skill: number | null;
}
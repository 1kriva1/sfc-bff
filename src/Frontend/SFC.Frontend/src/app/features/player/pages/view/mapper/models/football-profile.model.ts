import { IEnumModel } from "@core/types";
import { empty } from "ngx-sfc-common";

export interface IFootballProfileModel {
    height: number | null;
    weight: number | null;
    position: IEnumModel<number> | empty;
    additionalPosition: IEnumModel<number> | empty;
    workingFoot: IEnumModel<number> | empty;
    number: number | null;
    gameStyle: IEnumModel<number> | empty;
    skill: number | null;
    weakFoot: number | null;
    physicalCondition: number | null;
}